import { compact } from '../../util/array.js';
import { dirname, isInternal, toAbsolute } from '../../util/path.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
import { loadTSConfig } from '../../util/tsconfig-loader.js';
export const NAME = 'TypeScript';
export const ENABLERS = ['typescript'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['tsconfig.json'];
const resolveExtensibleConfig = async (configFilePath) => {
    const config = await load(configFilePath);
    config.extends = config.extends ? [config.extends].flat() : [];
    if (config?.extends) {
        for (const extend of [config.extends].flat()) {
            if (isInternal(extend)) {
                const presetConfigPath = toAbsolute(extend, dirname(configFilePath));
                const presetConfig = await resolveExtensibleConfig(presetConfigPath);
                config.extends.push(...(presetConfig.extends ? [presetConfig.extends].flat() : []));
            }
        }
    }
    return config;
};
const findTypeScriptDependencies = async (configFilePath) => {
    const compilerOptions = await loadTSConfig(configFilePath);
    const config = await resolveExtensibleConfig(configFilePath);
    if (!compilerOptions || !config)
        return [];
    const extend = config.extends ? [config.extends].flat().filter(extend => !isInternal(extend)) : [];
    const plugins = Array.isArray(compilerOptions?.plugins)
        ? compilerOptions.plugins.map(plugin => (typeof plugin === 'object' && 'name' in plugin ? plugin.name : ''))
        : [];
    const importHelpers = compilerOptions?.importHelpers ? ['tslib'] : [];
    const jsx = compilerOptions?.jsxImportSource
        ? [compilerOptions.jsxImportSource]
        : compilerOptions?.jsx
            ? ['react']
            : [];
    return compact([...extend, ...plugins, ...importHelpers, ...jsx]);
};
export const findDependencies = timerify(findTypeScriptDependencies);
