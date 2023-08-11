import { _getDependenciesFromScripts } from '../../binaries/index.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Release It';
export const ENABLERS = ['release-it'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    '.release-it.json',
    '.release-it.{js,cjs}',
    '.release-it.{yml,yaml}',
    'package.json',
];
const findReleaseItDependencies = async (configFilePath, { cwd, manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest['release-it']
        : await load(configFilePath);
    if (!config)
        return [];
    const plugins = config.plugins ? Object.keys(config.plugins) : [];
    const scripts = config.hooks ? Object.values(config.hooks).flat() : [];
    const dependencies = _getDependenciesFromScripts(scripts, { cwd, manifest });
    return [...plugins, ...dependencies];
};
export const findDependencies = timerify(findReleaseItDependencies);
