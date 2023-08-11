import { existsSync } from 'node:fs';
import mapWorkspaces from '@npmcli/map-workspaces';
import micromatch from 'micromatch';
import { ConfigurationValidator } from './ConfigurationValidator.js';
import { ROOT_WORKSPACE_NAME, DEFAULT_EXTENSIONS, KNIP_CONFIG_LOCATIONS } from './constants.js';
import { defaultRules } from './issues/initializers.js';
import * as plugins from './plugins/index.js';
import { arrayify, compact } from './util/array.js';
import parsedArgValues from './util/cli-arguments.js';
import { partitionCompilers } from './util/compilers.js';
import { ConfigurationError } from './util/errors.js';
import { findFile, loadJSON } from './util/fs.js';
import { getIncludedIssueTypes } from './util/get-included-issue-types.js';
import { _dirGlob } from './util/glob.js';
import { _load } from './util/loader.js';
import { getKeysByValue } from './util/object.js';
import { join, relative, toPosix } from './util/path.js';
import { toCamelCase } from './util/plugin.js';
import { byPathDepth } from './util/workspace.js';
const { config: rawConfigArg, workspace: rawWorkspaceArg, include = [], exclude = [], dependencies = false, exports = false, } = parsedArgValues;
const workspaceArg = rawWorkspaceArg ? toPosix(rawWorkspaceArg).replace(/^\.\//, '').replace(/\/$/, '') : undefined;
const getDefaultWorkspaceConfig = (extensions) => {
    const exts = [...DEFAULT_EXTENSIONS, ...(extensions ?? [])].map(ext => ext.slice(1)).join(',');
    return {
        entry: [`{index,cli,main}.{${exts}}!`, `src/{index,cli,main}.{${exts}}!`],
        project: [`**/*.{${exts}}!`],
        paths: {},
        ignore: [],
        ignoreBinaries: [],
        ignoreDependencies: [],
    };
};
const defaultConfig = {
    rules: defaultRules,
    include: [],
    exclude: [],
    ignore: [],
    ignoreBinaries: [],
    ignoreDependencies: [],
    ignoreExportsUsedInFile: false,
    ignoreWorkspaces: [],
    syncCompilers: new Map(),
    asyncCompilers: new Map(),
    workspaces: {
        [ROOT_WORKSPACE_NAME]: getDefaultWorkspaceConfig(),
    },
};
const PLUGIN_NAMES = Object.keys(plugins);
export class ConfigurationChief {
    cwd;
    isProduction = false;
    config;
    manifestPath;
    manifest;
    ignoredWorkspacePatterns = [];
    manifestWorkspaces = new Map();
    additionalWorkspaceNames = new Set();
    enabledWorkspaceNames = [];
    enabledWorkspaceDirs = [];
    enabledWorkspaces = [];
    localWorkspaces = new Set();
    resolvedConfigFilePath;
    constructor({ cwd, isProduction }) {
        this.cwd = cwd;
        this.isProduction = isProduction;
        this.config = defaultConfig;
    }
    async init() {
        const manifestPath = findFile(this.cwd, 'package.json');
        const manifest = manifestPath && (await loadJSON(manifestPath));
        if (!manifestPath || !manifest) {
            throw new ConfigurationError('Unable to find package.json');
        }
        this.manifestPath = manifestPath;
        this.manifest = manifest;
        const pnpmWorkspacesPath = findFile(this.cwd, 'pnpm-workspace.yaml');
        const pnpmWorkspaces = pnpmWorkspacesPath && (await _load(pnpmWorkspacesPath));
        if (this.manifest && !this.manifest.workspaces && pnpmWorkspaces) {
            this.manifest.workspaces = pnpmWorkspaces;
        }
        for (const configPath of rawConfigArg ? [rawConfigArg] : KNIP_CONFIG_LOCATIONS) {
            this.resolvedConfigFilePath = findFile(this.cwd, configPath);
            if (this.resolvedConfigFilePath)
                break;
        }
        if (rawConfigArg && !this.resolvedConfigFilePath && !manifest.knip) {
            throw new ConfigurationError(`Unable to find ${rawConfigArg} or package.json#knip`);
        }
        const rawLocalConfig = this.resolvedConfigFilePath ? await _load(this.resolvedConfigFilePath) : manifest.knip;
        if (rawLocalConfig) {
            const parsedConfig = ConfigurationValidator.parse(partitionCompilers(rawLocalConfig));
            this.config = this.normalize(parsedConfig);
        }
        await this.setWorkspaces();
    }
    getCompilers() {
        return [this.config.syncCompilers, this.config.asyncCompilers];
    }
    getRules() {
        return this.config.rules;
    }
    normalize(rawLocalConfig) {
        const initialWorkspaces = rawLocalConfig.workspaces ?? {
            [ROOT_WORKSPACE_NAME]: {
                ...rawLocalConfig,
            },
        };
        const rules = { ...defaultRules, ...rawLocalConfig.rules };
        const include = rawLocalConfig.include ?? defaultConfig.include;
        const exclude = rawLocalConfig.exclude ?? defaultConfig.exclude;
        const ignore = arrayify(rawLocalConfig.ignore ?? defaultConfig.ignore);
        const ignoreBinaries = rawLocalConfig.ignoreBinaries ?? [];
        const ignoreExportsUsedInFile = rawLocalConfig.ignoreExportsUsedInFile ?? false;
        const ignoreDependencies = rawLocalConfig.ignoreDependencies ?? [];
        const ignoreWorkspaces = rawLocalConfig.ignoreWorkspaces ?? defaultConfig.ignoreWorkspaces;
        const { syncCompilers, asyncCompilers } = rawLocalConfig;
        const extensions = [...Object.keys(syncCompilers ?? {}), ...Object.keys(asyncCompilers ?? {})];
        const defaultWorkspaceConfig = getDefaultWorkspaceConfig(extensions);
        const workspaces = Object.entries(initialWorkspaces)
            .filter(([workspaceName]) => !ignoreWorkspaces.includes(workspaceName))
            .reduce((workspaces, workspace) => {
            const [workspaceName, workspaceConfig] = workspace;
            const entry = workspaceConfig.entry ? arrayify(workspaceConfig.entry) : defaultWorkspaceConfig.entry;
            const project = workspaceConfig.project ? arrayify(workspaceConfig.project) : defaultWorkspaceConfig.project;
            const paths = workspaceConfig.paths ?? defaultWorkspaceConfig.paths;
            workspaces[workspaceName] = {
                entry,
                project,
                paths,
                ignore: arrayify(workspaceConfig.ignore),
                ignoreBinaries: arrayify(workspaceConfig.ignoreBinaries),
                ignoreDependencies: arrayify(workspaceConfig.ignoreDependencies),
            };
            for (const [name, pluginConfig] of Object.entries(workspaceConfig)) {
                const pluginName = toCamelCase(name);
                if (PLUGIN_NAMES.includes(pluginName)) {
                    if (pluginConfig === false) {
                        workspaces[workspaceName][pluginName] = false;
                    }
                    else {
                        const isObject = typeof pluginConfig !== 'string' && !Array.isArray(pluginConfig);
                        const config = isObject ? arrayify(pluginConfig.config) : pluginConfig ? arrayify(pluginConfig) : null;
                        const entry = isObject && 'entry' in pluginConfig ? arrayify(pluginConfig.entry) : null;
                        const project = isObject && 'project' in pluginConfig ? arrayify(pluginConfig.project) : entry;
                        workspaces[workspaceName][pluginName] = {
                            config,
                            entry,
                            project,
                        };
                    }
                }
            }
            return workspaces;
        }, {});
        return {
            rules,
            include,
            exclude,
            ignore,
            ignoreBinaries,
            ignoreDependencies,
            ignoreExportsUsedInFile,
            ignoreWorkspaces,
            syncCompilers: new Map(Object.entries(syncCompilers ?? {})),
            asyncCompilers: new Map(Object.entries(asyncCompilers ?? {})),
            workspaces,
        };
    }
    async setWorkspaces() {
        this.ignoredWorkspacePatterns = this.getIgnoredWorkspacePatterns();
        this.manifestWorkspaces = await this.getManifestWorkspaces();
        this.additionalWorkspaceNames = await this.getAdditionalWorkspaceNames();
        this.enabledWorkspaceNames = this.getEnabledWorkspaceNames();
        this.enabledWorkspaces = this.getEnabledWorkspaces();
        this.enabledWorkspaceDirs = this.enabledWorkspaceNames
            .sort(byPathDepth)
            .reverse()
            .map(dir => join(this.cwd, dir));
        this.localWorkspaces = new Set(compact(this.enabledWorkspaces.map(w => w.pkgName)));
    }
    getListedWorkspaces() {
        return this.manifest?.workspaces
            ? Array.isArray(this.manifest.workspaces)
                ? this.manifest.workspaces
                : this.manifest.workspaces.packages ?? []
            : [];
    }
    getIgnoredWorkspacePatterns() {
        const ignoredWorkspaces = this.getListedWorkspaces()
            .filter(name => name.startsWith('!'))
            .map(name => name.replace(/^!/, ''));
        return [...ignoredWorkspaces, ...this.config.ignoreWorkspaces];
    }
    async getManifestWorkspaces() {
        const workspaces = await mapWorkspaces({
            pkg: this.manifest ?? {},
            cwd: this.cwd,
        });
        const manifestWorkspaces = new Map();
        for (const [pkgName, dir] of workspaces.entries()) {
            manifestWorkspaces.set(relative(this.cwd, dir), pkgName);
        }
        return manifestWorkspaces;
    }
    async getAdditionalWorkspaceNames() {
        const additionalWorkspaceKeys = Object.keys(this.config.workspaces);
        const patterns = additionalWorkspaceKeys.filter(key => key.includes('*'));
        const dirs = additionalWorkspaceKeys.filter(key => !key.includes('*'));
        const globbedDirs = await _dirGlob({ patterns, cwd: this.cwd });
        return new Set([...dirs, ...globbedDirs].filter(name => name !== ROOT_WORKSPACE_NAME &&
            !this.manifestWorkspaces.has(name) &&
            !micromatch.isMatch(name, this.ignoredWorkspacePatterns)));
    }
    getEnabledWorkspaceNames() {
        return [ROOT_WORKSPACE_NAME, ...this.manifestWorkspaces.keys(), ...this.additionalWorkspaceNames].filter(name => !micromatch.isMatch(name, this.ignoredWorkspacePatterns));
    }
    getEnabledWorkspaces() {
        if (workspaceArg && !existsSync(workspaceArg)) {
            throw new ConfigurationError(`Directory does not exist: ${workspaceArg}`);
        }
        const workspaceNames = workspaceArg
            ? this.enabledWorkspaceNames.filter(name => name === workspaceArg)
            : this.enabledWorkspaceNames;
        const getAncestors = (name) => (ancestors, ancestorName) => {
            if (name === ancestorName)
                return ancestors;
            if (ancestorName === ROOT_WORKSPACE_NAME || name.startsWith(ancestorName + '/'))
                ancestors.push(ancestorName);
            return ancestors;
        };
        return workspaceNames.sort(byPathDepth).map((name) => ({
            name,
            pkgName: this.manifestWorkspaces.get(name) ?? this.manifest?.name,
            dir: join(this.cwd, name),
            config: this.getConfigForWorkspace(name),
            ancestors: workspaceNames.reduce(getAncestors(name), []),
        }));
    }
    getWorkspaces() {
        return this.enabledWorkspaces;
    }
    getDescendentWorkspaces(name) {
        return this.enabledWorkspaceNames
            .filter(workspaceName => workspaceName !== name)
            .filter(workspaceName => name === ROOT_WORKSPACE_NAME || workspaceName.startsWith(name + '/'));
    }
    getIgnoredWorkspacesFor(name) {
        return this.ignoredWorkspacePatterns
            .filter(workspaceName => workspaceName !== name)
            .filter(workspaceName => name === ROOT_WORKSPACE_NAME || workspaceName.startsWith(name));
    }
    getNegatedWorkspacePatterns(name) {
        const descendentWorkspaces = this.getDescendentWorkspaces(name);
        const matchName = new RegExp(`^${name}/`);
        const ignoredWorkspaces = this.getIgnoredWorkspacesFor(name);
        return [...ignoredWorkspaces, ...descendentWorkspaces]
            .map(workspaceName => workspaceName.replace(matchName, ''))
            .map(workspaceName => `!${workspaceName}`);
    }
    getConfigKeyForWorkspace(workspaceName) {
        return Object.keys(this.config.workspaces)
            .sort(byPathDepth)
            .reverse()
            .find(pattern => micromatch.isMatch(workspaceName, pattern));
    }
    getConfigForWorkspace(workspaceName) {
        const key = this.getConfigKeyForWorkspace(workspaceName);
        if (key && this.config?.workspaces?.[key])
            return this.config.workspaces[key];
        return getDefaultWorkspaceConfig();
    }
    getIssueTypesToReport() {
        const cliArgs = { include, exclude, dependencies, exports };
        const excludesFromRules = getKeysByValue(this.config.rules, 'off');
        const config = {
            include: this.config.include ?? [],
            exclude: [...excludesFromRules, ...this.config.exclude],
            isProduction: this.isProduction,
        };
        return getIncludedIssueTypes(cliArgs, config);
    }
    findWorkspaceByFilePath(filePath) {
        const workspaceDir = this.enabledWorkspaceDirs.find(workspaceDir => filePath.startsWith(workspaceDir + '/'));
        return this.enabledWorkspaces.find(workspace => workspace.dir === workspaceDir);
    }
    findWorkspaceByPackageName(packageName) {
        return this.enabledWorkspaces.find(workspace => workspace.pkgName === packageName);
    }
    getUnusedIgnoredWorkspaces() {
        const ignoredWorkspaceNames = this.config.ignoreWorkspaces;
        const workspaceNames = [...this.manifestWorkspaces.keys(), ...this.additionalWorkspaceNames];
        return ignoredWorkspaceNames.filter(ignoredWorkspaceName => !workspaceNames.some(name => micromatch.isMatch(name, ignoredWorkspaceName)));
    }
}
