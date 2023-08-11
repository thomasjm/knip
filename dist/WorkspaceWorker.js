import { TEST_FILE_PATTERNS } from './constants.js';
import * as npm from './manifest/index.js';
import * as plugins from './plugins/index.js';
import { debugLogArray, debugLogObject } from './util/debug.js';
import { _pureGlob, negate, hasProductionSuffix, hasNoProductionSuffix, prependDirToPattern } from './util/glob.js';
import { getKeysByValue } from './util/object.js';
import { join, toPosix } from './util/path.js';
const negatedTestFilePatterns = TEST_FILE_PATTERNS.map(negate);
export class WorkspaceWorker {
    name;
    dir;
    cwd;
    config;
    manifest;
    isProduction;
    isStrict;
    rootIgnore;
    negatedWorkspacePatterns = [];
    enabledPluginsInAncestors;
    enabled;
    enabledPlugins = [];
    referencedDependencies = new Set();
    peerDependencies = new Map();
    installedBinaries = new Map();
    constructor({ name, dir, cwd, config, manifest, isProduction, isStrict, rootIgnore, negatedWorkspacePatterns, enabledPluginsInAncestors, }) {
        this.name = name;
        this.dir = dir;
        this.cwd = cwd;
        this.config = config;
        this.manifest = manifest;
        this.isProduction = isProduction;
        this.isStrict = isStrict;
        this.rootIgnore = rootIgnore;
        this.negatedWorkspacePatterns = negatedWorkspacePatterns;
        this.enabledPluginsInAncestors = enabledPluginsInAncestors;
        this.enabled = Object.keys(plugins).reduce((enabled, pluginName) => ({ ...enabled, [pluginName]: false }), {});
    }
    async init() {
        await this.setEnabledPlugins();
        await this.initReferencedDependencies();
    }
    async setEnabledPlugins() {
        const manifest = this.manifest;
        const deps = Object.keys(manifest.dependencies ?? {});
        const devDeps = Object.keys(manifest.devDependencies ?? {});
        const dependencies = new Set([...deps, ...devDeps]);
        const pluginEntries = Object.entries(plugins);
        for (const [pluginName, plugin] of pluginEntries) {
            if (this.config[pluginName] === false)
                continue;
            const isEnabledInAncestor = this.enabledPluginsInAncestors.includes(pluginName);
            if (isEnabledInAncestor || (await plugin.isEnabled({ cwd: this.dir, manifest, dependencies }))) {
                this.enabled[pluginName] = true;
            }
        }
        this.enabledPlugins = getKeysByValue(this.enabled, true);
        const enabledPluginNames = this.enabledPlugins.map(name => plugins[name].NAME);
        debugLogObject(`Enabled plugins (${this.name})`, enabledPluginNames);
    }
    async initReferencedDependencies() {
        const { dependencies, peerDependencies, installedBinaries } = await npm.findDependencies({
            manifest: this.manifest,
            isProduction: this.isProduction,
            isStrict: this.isStrict,
            dir: this.dir,
            cwd: this.cwd,
        });
        const filePath = join(this.dir, 'package.json');
        dependencies.forEach(dependency => this.referencedDependencies.add([filePath, dependency]));
        this.peerDependencies = peerDependencies;
        this.installedBinaries = installedBinaries;
    }
    getConfigForPlugin(pluginName) {
        return this.config[pluginName] ?? { config: null, entry: null, project: null };
    }
    getEntryFilePatterns() {
        const { entry } = this.config;
        if (entry.length === 0)
            return [];
        return [entry, TEST_FILE_PATTERNS, this.negatedWorkspacePatterns].flat();
    }
    getProjectFilePatterns() {
        const { project } = this.config;
        if (project.length === 0)
            return [];
        const negatedPluginConfigPatterns = this.getPluginConfigPatterns().map(negate);
        const negatedPluginEntryFilePatterns = this.getPluginEntryFilePatterns(false).map(negate);
        const negatedPluginProjectFilePatterns = this.getPluginProjectFilePatterns().map(negate);
        return [
            project,
            negatedPluginConfigPatterns,
            negatedPluginEntryFilePatterns,
            negatedPluginProjectFilePatterns,
            TEST_FILE_PATTERNS,
            this.negatedWorkspacePatterns,
        ].flat();
    }
    getPluginEntryFilePatterns(isIncludeProductionEntryFiles = true) {
        const patterns = [];
        for (const [pluginName, plugin] of Object.entries(plugins)) {
            const pluginConfig = this.getConfigForPlugin(pluginName);
            if (this.enabled[pluginName] && pluginConfig) {
                const { entry } = pluginConfig;
                const defaultEntryFiles = 'ENTRY_FILE_PATTERNS' in plugin ? plugin.ENTRY_FILE_PATTERNS : [];
                patterns.push(...(entry ?? defaultEntryFiles));
                if (isIncludeProductionEntryFiles) {
                    const entry = 'PRODUCTION_ENTRY_FILE_PATTERNS' in plugin ? plugin.PRODUCTION_ENTRY_FILE_PATTERNS : [];
                    patterns.push(...entry);
                }
            }
        }
        return [patterns, this.negatedWorkspacePatterns].flat();
    }
    getPluginProjectFilePatterns() {
        const patterns = [];
        for (const [pluginName, plugin] of Object.entries(plugins)) {
            const pluginConfig = this.getConfigForPlugin(pluginName);
            if (this.enabled[pluginName] && pluginConfig) {
                const { entry, project } = pluginConfig;
                patterns.push(...(project ??
                    entry ??
                    ('PROJECT_FILE_PATTERNS' in plugin
                        ? plugin.PROJECT_FILE_PATTERNS
                        : 'ENTRY_FILE_PATTERNS' in plugin
                            ? plugin.ENTRY_FILE_PATTERNS
                            : [])));
            }
        }
        return [patterns, this.negatedWorkspacePatterns].flat();
    }
    getPluginConfigPatterns() {
        const patterns = [];
        for (const [pluginName, plugin] of Object.entries(plugins)) {
            const pluginConfig = this.getConfigForPlugin(pluginName);
            if (this.enabled[pluginName] && pluginConfig) {
                const { config } = pluginConfig;
                const defaultConfigFiles = 'CONFIG_FILE_PATTERNS' in plugin ? plugin.CONFIG_FILE_PATTERNS : [];
                patterns.push(...(config ?? defaultConfigFiles));
            }
        }
        return patterns;
    }
    getProductionEntryFilePatterns() {
        const entry = this.config.entry.filter(hasProductionSuffix);
        if (entry.length === 0)
            return [];
        const negatedEntryFiles = this.config.entry.filter(hasNoProductionSuffix).map(negate);
        return [entry, negatedEntryFiles, negatedTestFilePatterns, this.negatedWorkspacePatterns].flat();
    }
    getProductionProjectFilePatterns() {
        const project = this.config.project;
        if (project.length === 0)
            return this.getProductionEntryFilePatterns();
        const _project = this.config.project.map(pattern => {
            if (!pattern.endsWith('!') && !pattern.startsWith('!'))
                return negate(pattern);
            return pattern;
        });
        const negatedEntryFiles = this.config.entry.filter(hasNoProductionSuffix).map(negate);
        const negatedPluginConfigPatterns = this.getPluginConfigPatterns().map(negate);
        const negatedPluginEntryFilePatterns = this.getPluginEntryFilePatterns(false).map(negate);
        const negatedPluginProjectFilePatterns = this.getPluginProjectFilePatterns().map(negate);
        return [
            _project,
            negatedEntryFiles,
            negatedPluginConfigPatterns,
            negatedPluginEntryFilePatterns,
            negatedPluginProjectFilePatterns,
            negatedTestFilePatterns,
            this.negatedWorkspacePatterns,
        ].flat();
    }
    getProductionPluginEntryFilePatterns() {
        const patterns = [];
        for (const [pluginName, plugin] of Object.entries(plugins)) {
            const pluginConfig = this.getConfigForPlugin(pluginName);
            if (this.enabled[pluginName] && pluginConfig) {
                if ('PRODUCTION_ENTRY_FILE_PATTERNS' in plugin) {
                    patterns.push(...(pluginConfig.entry ?? plugin.PRODUCTION_ENTRY_FILE_PATTERNS));
                }
            }
        }
        if (patterns.length === 0)
            return [];
        return [patterns.flat(), negatedTestFilePatterns].flat();
    }
    getConfigurationFilePatterns(pluginName) {
        const plugin = plugins[pluginName];
        const pluginConfig = this.getConfigForPlugin(pluginName);
        if (pluginConfig) {
            const defaultConfig = 'CONFIG_FILE_PATTERNS' in plugin ? plugin.CONFIG_FILE_PATTERNS : [];
            return pluginConfig.config ?? defaultConfig;
        }
        return [];
    }
    getIgnorePatterns() {
        return [...this.rootIgnore, ...this.config.ignore.map(pattern => prependDirToPattern(this.name, pattern))];
    }
    async findDependenciesByPlugins() {
        const cwd = this.dir;
        const ignore = this.getIgnorePatterns();
        for (const [pluginName, plugin] of Object.entries(plugins)) {
            const isIncludePlugin = this.isProduction ? `PRODUCTION_ENTRY_FILE_PATTERNS` in plugin : true;
            if (this.enabled[pluginName] && isIncludePlugin) {
                const hasDependencyFinder = 'findDependencies' in plugin && typeof plugin.findDependencies === 'function';
                if (hasDependencyFinder) {
                    const pluginConfig = this.getConfigForPlugin(pluginName);
                    if (!pluginConfig)
                        continue;
                    const patterns = this.getConfigurationFilePatterns(pluginName);
                    const configFilePaths = await _pureGlob({ patterns, cwd, ignore, gitignore: false });
                    debugLogArray(`Found ${plugin.NAME} config file paths`, configFilePaths);
                    if (configFilePaths.length === 0)
                        continue;
                    const pluginDependencies = new Set();
                    for (const configFilePath of configFilePaths) {
                        const dependencies = await plugin.findDependencies(configFilePath, {
                            cwd,
                            manifest: this.manifest,
                            config: pluginConfig,
                            isProduction: this.isProduction,
                        });
                        dependencies.map(toPosix).forEach(specifier => {
                            pluginDependencies.add(specifier);
                            this.referencedDependencies.add([configFilePath, specifier]);
                        });
                        dependencies.forEach(dependency => pluginDependencies.add(dependency));
                    }
                    debugLogArray(`Dependencies referenced in ${plugin.NAME}`, pluginDependencies);
                }
            }
        }
    }
    async findAllDependencies() {
        await this.findDependenciesByPlugins();
        return {
            peerDependencies: this.peerDependencies,
            installedBinaries: this.installedBinaries,
            referencedDependencies: this.referencedDependencies,
            enabledPlugins: this.enabledPlugins,
        };
    }
}
