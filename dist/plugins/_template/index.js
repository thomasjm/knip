import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = '';
export const ENABLERS = [''];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [];
export const ENTRY_FILE_PATTERNS = [];
export const PRODUCTION_ENTRY_FILE_PATTERNS = [];
export const PROJECT_FILE_PATTERNS = [];
const findPluginDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json') ? manifest.plugin : await load(configFilePath);
    return config?.plugins ?? [];
};
export const findDependencies = timerify(findPluginDependencies);
