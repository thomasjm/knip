import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Semantic Release';
export const ENABLERS = ['semantic-release'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    '.releaserc',
    '.releaserc.{yaml,yml,json,js,cjs}',
    'release.config.{js,cjs}',
    'package.json',
];
const findSemanticReleaseDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json') ? manifest.release : await load(configFilePath);
    const plugins = config?.plugins ?? [];
    return plugins.map(plugin => (Array.isArray(plugin) ? plugin[0] : plugin));
};
export const findDependencies = timerify(findSemanticReleaseDependencies);
