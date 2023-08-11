import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Prettier';
export const ENABLERS = ['prettier'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    '.prettierrc',
    '.prettierrc.{json,js,cjs,yml,yaml}',
    'prettier.config.{js,cjs}',
    'package.json',
];
const findPrettierDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest.prettier
        : await load(configFilePath);
    return config && Array.isArray(config.plugins)
        ? config.plugins.filter((plugin) => typeof plugin === 'string')
        : [];
};
export const findDependencies = timerify(findPrettierDependencies);
