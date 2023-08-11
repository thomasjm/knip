import { _glob } from './glob.js';
import { getStringValues } from './object.js';
import { toPosix } from './path.js';
export const getPackageNameFromModuleSpecifier = (moduleSpecifier) => {
    if (!isMaybePackageName(moduleSpecifier))
        return;
    const parts = moduleSpecifier.split('/').slice(0, 2);
    return moduleSpecifier.startsWith('@') ? parts.join('/') : parts[0];
};
export const getPackageNameFromFilePath = (value) => {
    const match = toPosix(value).match(/(?<=node_modules\/)(@[^/]+\/[^/]+|[^/]+)/g);
    if (match)
        return match[match.length - 1];
    return value;
};
export const isMaybePackageName = (specifier) => /^@?[a-z0-9]/.test(specifier);
export const isDefinitelyTyped = (packageName) => packageName.startsWith('@types/');
export const getDefinitelyTypedFor = (packageName) => {
    if (isDefinitelyTyped(packageName))
        return packageName;
    if (packageName.startsWith('@'))
        return '@types/' + packageName.slice(1).replace('/', '__');
    return '@types/' + packageName;
};
export const getPackageFromDefinitelyTyped = (typedDependency) => {
    if (typedDependency.includes('__')) {
        const [scope, packageName] = typedDependency.split('__');
        return `@${scope}/${packageName}`;
    }
    return typedDependency;
};
export const getEntryPathFromManifest = (cwd, dir, manifest) => {
    const { main, bin, exports } = manifest;
    const entryPaths = new Set();
    if (typeof main === 'string')
        entryPaths.add(main);
    if (bin) {
        if (typeof bin === 'string')
            entryPaths.add(bin);
        if (typeof bin === 'object')
            Object.values(bin).forEach(bin => entryPaths.add(bin));
    }
    if (exports) {
        if (typeof exports === 'string') {
            entryPaths.add(exports);
        }
        else {
            getStringValues(exports).forEach(item => entryPaths.add(item));
        }
    }
    return _glob({ cwd, workingDir: dir, patterns: Array.from(entryPaths) });
};
