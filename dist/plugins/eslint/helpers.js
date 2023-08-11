import { compact } from '../../util/array.js';
import { isInternal, dirname, toAbsolute } from '../../util/path.js';
import { load } from '../../util/plugin.js';
import { _resolve } from '../../util/require.js';
import { fallback } from './fallback.js';
const getDependencies = (config) => {
    const extendsSpecifiers = config.extends ? [config.extends].flat().map(resolveExtendSpecifier) : [];
    if (extendsSpecifiers.includes('eslint-plugin-prettier'))
        extendsSpecifiers.push('eslint-config-prettier');
    const plugins = config.plugins ? config.plugins.map(resolvePluginSpecifier) : [];
    const parser = config.parser;
    const extraPlugins = config.parserOptions?.babelOptions?.plugins ?? [];
    const extraParsers = config.parserOptions?.babelOptions?.presets ?? [];
    const settings = config.settings ? getDependenciesFromSettings(config.settings) : [];
    const overrides = config.overrides ? [config.overrides].flat().flatMap(getDependencies) : [];
    return compact([
        ...extendsSpecifiers,
        ...plugins,
        ...extraPlugins,
        parser,
        ...extraParsers,
        ...settings,
        ...overrides,
    ]);
};
export const getDependenciesDeep = async (configFilePath, dependencies = new Set(), options) => {
    const addAll = (deps) => deps.forEach(dependency => dependencies.add(dependency));
    const config = configFilePath.endsWith('package.json')
        ? options.manifest.eslintConfig
        : /(\.(jsonc?|ya?ml)|rc)$/.test(configFilePath)
            ? await load(configFilePath)
            : await fallback(configFilePath);
    if (config) {
        if (config.extends) {
            for (const extend of [config.extends].flat()) {
                if (isInternal(extend)) {
                    const filePath = toAbsolute(extend, dirname(configFilePath));
                    const extendConfigFilePath = _resolve(filePath);
                    dependencies.add(extendConfigFilePath);
                    addAll(await getDependenciesDeep(extendConfigFilePath, dependencies, options));
                }
            }
        }
        addAll(getDependencies(config));
    }
    return dependencies;
};
const isQualifiedSpecifier = (specifier) => specifier === 'eslint' ||
    /\/eslint-(config|plugin)$/.test(specifier) ||
    /.+eslint-(config|plugin)\//.test(specifier) ||
    /eslint-(config|plugin)-/.test(specifier);
const resolveSpecifier = (namespace, rawSpecifier) => {
    const specifier = rawSpecifier.replace(/(^plugin:|:.+$)/, '');
    if (isQualifiedSpecifier(specifier))
        return specifier;
    if (!specifier.startsWith('@'))
        return `${namespace}-${specifier}`;
    const [scope, name, ...rest] = specifier.split('/');
    if (rawSpecifier.startsWith('plugin:') && rest.length === 0)
        return [scope, namespace, name].join('/');
    return [scope, name ? `${namespace}-${name}` : namespace, ...rest].join('/');
};
export const resolvePluginSpecifier = (specifier) => resolveSpecifier('eslint-plugin', specifier);
export const resolveExtendSpecifier = (specifier) => {
    if (isInternal(specifier))
        return;
    if (/^next(\/.+)?$/.test(specifier))
        return specifier;
    const namespace = specifier.startsWith('plugin:') ? 'eslint-plugin' : 'eslint-config';
    return resolveSpecifier(namespace, specifier);
};
const getDependenciesFromSettings = (settings = {}) => {
    return compact(Object.entries(settings).flatMap(([settingKey, settings]) => {
        if (settingKey === 'import/resolver') {
            return (typeof settings === 'string' ? [settings] : Object.keys(settings))
                .filter(key => key !== 'node')
                .map(key => `eslint-import-resolver-${key}`);
        }
        if (settingKey === 'import/parsers') {
            return typeof settings === 'string' ? [settings] : Object.keys(settings);
        }
    }));
};
