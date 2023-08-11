export { _load as load } from './loader.js';
export const toCamelCase = (name) => name.toLowerCase().replace(/(-[a-z])/g, group => group.toUpperCase().replace('-', ''));
export const hasDependency = (dependencies, values) => values.some(value => {
    if (typeof value === 'string') {
        return dependencies.has(value);
    }
    else if (value instanceof RegExp) {
        for (const dependency of dependencies) {
            if (value.test(dependency))
                return true;
        }
    }
    return false;
});
