import { join, isInternal, toAbsolute, dirname } from '../../util/path.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Jest';
export const ENABLERS = ['jest'];
export const isEnabled = ({ dependencies, manifest }) => hasDependency(dependencies, ENABLERS) || Boolean(manifest.name?.startsWith('jest-presets'));
export const CONFIG_FILE_PATTERNS = ['jest.config.{js,ts,mjs,cjs,json}', 'package.json'];
export const ENTRY_FILE_PATTERNS = [];
const resolveExtensibleConfig = async (configFilePath) => {
    const config = await load(configFilePath);
    if (config?.preset) {
        const { preset } = config;
        if (isInternal(preset)) {
            const presetConfigPath = toAbsolute(preset, dirname(configFilePath));
            const presetConfig = await resolveExtensibleConfig(presetConfigPath);
            Object.assign(config, presetConfig);
        }
    }
    return config;
};
const resolveDependencies = (config) => {
    const presets = (config.preset ? [config.preset] : []).map(preset => isInternal(preset) ? preset : join(preset, 'jest-preset'));
    const projects = Array.isArray(config.projects)
        ? config.projects.map(config => (typeof config === 'string' ? config : resolveDependencies(config))).flat()
        : [];
    const runner = config.runner ? [config.runner] : [];
    const environments = config.testEnvironment === 'jsdom' ? ['jest-environment-jsdom'] : [];
    const resolvers = config.resolver ? [config.resolver] : [];
    const reporters = config.reporters
        ? config.reporters
            .map(reporter => (typeof reporter === 'string' ? reporter : reporter[0]))
            .filter(reporter => !['default', 'github-actions', 'summary'].includes(reporter))
        : [];
    const watchPlugins = config.watchPlugins?.map(watchPlugin => (typeof watchPlugin === 'string' ? watchPlugin : watchPlugin[0])) ?? [];
    const setupFiles = config.setupFiles ?? [];
    const setupFilesAfterEnv = config.setupFilesAfterEnv ?? [];
    const transform = config.transform
        ? Object.values(config.transform).map(transform => (typeof transform === 'string' ? transform : transform[0]))
        : [];
    const moduleNameMapper = (config.moduleNameMapper
        ? Object.values(config.moduleNameMapper).map(mapper => (typeof mapper === 'string' ? mapper : mapper[0]))
        : []).filter(value => !/\$[0-9]/.test(value));
    return [
        ...presets,
        ...projects,
        ...runner,
        ...environments,
        ...resolvers,
        ...reporters,
        ...watchPlugins,
        ...setupFiles,
        ...setupFilesAfterEnv,
        ...transform,
        ...moduleNameMapper,
    ];
};
const findJestDependencies = async (configFilePath, { cwd, manifest }) => {
    let config = configFilePath.endsWith('package.json')
        ? manifest.jest
        : await resolveExtensibleConfig(configFilePath);
    if (typeof config === 'function')
        config = await config();
    if (!config)
        return [];
    const replaceRootDir = (name) => name.includes('<rootDir>') ? join(cwd, name.replace(/^.*<rootDir>/, '')) : name;
    return resolveDependencies(config).map(replaceRootDir);
};
export const findDependencies = timerify(findJestDependencies);
