import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Commitizen';
export const ENABLERS = ['commitizen'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['.czrc', 'package.json'];
const findPluginDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest.config?.commitizen
        : await load(configFilePath);
    const path = config?.path;
    return path === undefined ? [] : [path];
};
export const findDependencies = timerify(findPluginDependencies);
