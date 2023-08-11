import { compact } from '../../util/array.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
import { resolvePresetName, resolvePluginName, api } from './helpers.js';
export const NAME = 'Babel';
export const ENABLERS = [/^@babel\//];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    'babel.config.json',
    'babel.config.js',
    '.babelrc.json',
    '.babelrc.js',
    '.babelrc',
    'package.json',
];
const getItemName = (value) => typeof value === 'string' ? [value] : Array.isArray(value) ? [value[0]] : [];
export const getDependenciesFromConfig = (config) => {
    const presets = config.presets?.flatMap(getItemName).map(resolvePresetName) ?? [];
    const plugins = config.plugins?.flatMap(getItemName).map(resolvePluginName) ?? [];
    const nested = config.env ? Object.values(config.env).flatMap(getDependenciesFromConfig) : [];
    return compact([...presets, ...plugins, ...nested]);
};
const findBabelDependencies = async (configFilePath, { manifest }) => {
    let config = configFilePath.endsWith('package.json') ? manifest.babel : await load(configFilePath);
    if (typeof config === 'function') {
        config = config(api);
    }
    return config ? getDependenciesFromConfig(config) : [];
};
export const findDependencies = timerify(findBabelDependencies);
