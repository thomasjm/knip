import { createRequire as nodeCreateRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { debugLog } from './debug.js';
import { getPackageNameFromModuleSpecifier } from './modules.js';
import { cwd, toPosix, join } from './path.js';
import { timerify } from './Performance.js';
const createRequire = (path) => nodeCreateRequire(pathToFileURL(path ?? cwd));
const require = createRequire();
const resolve = (specifier) => toPosix(require.resolve(specifier));
const tryResolve = (specifier, from) => {
    try {
        return resolve(specifier);
    }
    catch {
        debugLog(`Unable to resolve ${specifier} (from ${from})`);
    }
};
const resolveSpecifier = (dir, specifier) => {
    try {
        const require = createRequire(join(dir, 'package.json'));
        return toPosix(require.resolve(specifier));
    }
    catch {
        const packageName = getPackageNameFromModuleSpecifier(specifier);
        if (packageName) {
            const relativeSpecifier = specifier.replace(packageName, '.');
            return tryResolve(join(dir, relativeSpecifier), dir);
        }
    }
};
export const _require = timerify(require);
export const _resolve = timerify(resolve);
export const _tryResolve = timerify(tryResolve);
export const _resolveSpecifier = timerify(resolveSpecifier);
