import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Capacitor';
export const ENABLERS = [/^@capacitor\//];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['capacitor.config.ts'];
const findCapacitorDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    return config.includePlugins ?? [];
};
export const findDependencies = timerify(findCapacitorDependencies);
