import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Remark';
export const ENABLERS = ['remark-cli'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    'package.json',
    '.remarkrc',
    '.remarkrc.json',
    '.remarkrc.{js,cjs,mjs}',
    '.remarkrc.{yml,yaml}',
];
const findRemarkDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json') ? manifest.remarkConfig : await load(configFilePath);
    const plugins = config?.plugins?.map(plugin => `remark-${plugin}`) ?? [];
    return [...plugins];
};
export const findDependencies = timerify(findRemarkDependencies);
