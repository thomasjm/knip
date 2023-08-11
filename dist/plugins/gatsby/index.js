import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Gatsby';
export const ENABLERS = ['gatsby', 'gatsby-cli'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['gatsby-{config,node}.{js,jsx,ts,tsx}'];
export const PRODUCTION_ENTRY_FILE_PATTERNS = [
    'gatsby-{browser,ssr}.{js,jsx,ts,tsx}',
    'src/api/**/*.{js,ts}',
    'src/pages/**/*.{js,jsx,ts,tsx}',
    'src/templates/**/*.{js,jsx,ts,tsx}',
    'src/html.{js,jsx,ts,tsx}',
];
const findGatsbyDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    if (/gatsby-config/.test(configFilePath)) {
        return config.plugins.map(plugin => (typeof plugin === 'string' ? plugin : plugin.resolve));
    }
    if (/gatsby-node/.test(configFilePath)) {
        const plugins = new Set();
        const actions = { setBabelPlugin: plugin => plugins.add(plugin.name) };
        const _config = config;
        if (typeof _config.onCreateBabelConfig === 'function') {
            _config.onCreateBabelConfig({ actions });
        }
        return Array.from(plugins);
    }
    return [];
};
export const findDependencies = timerify(findGatsbyDependencies);
