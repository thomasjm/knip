import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'PostCSS';
export const ENABLERS = ['postcss', 'next'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['postcss.config.js', 'postcss.config.json', 'package.json'];
const findPostCSSDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest?.postcss
        : await load(configFilePath);
    return config?.plugins
        ? (Array.isArray(config.plugins) ? config.plugins : Object.keys(config.plugins)).flatMap(plugin => {
            if (typeof plugin === 'string') {
                return plugin;
            }
            if (Array.isArray(plugin) && typeof plugin[0] === 'string') {
                return plugin[0];
            }
            return [];
        })
        : [];
};
export const findDependencies = timerify(findPostCSSDependencies);
