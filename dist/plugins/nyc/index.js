import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'nyc';
export const ENABLERS = ['nyc'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['.nycrc', '.nycrc.json', '.nycrc.{yml,yaml}', 'nyc.config.js'];
const findNycDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    return config.extends ? [config.extends].flat() : [];
};
export const findDependencies = timerify(findNycDependencies);
