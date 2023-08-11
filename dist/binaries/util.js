import { getPackageNameFromFilePath, getPackageNameFromModuleSpecifier } from '../util/modules.js';
import { isInNodeModules, join } from '../util/path.js';
import { _tryResolve } from '../util/require.js';
export const tryResolveFilePath = (cwd, specifier, acceptModuleSpecifier) => {
    if (specifier) {
        const filePath = join(cwd, specifier);
        if (!isInNodeModules(filePath)) {
            const resolvedFilePath = _tryResolve(filePath, cwd);
            if (resolvedFilePath) {
                return resolvedFilePath;
            }
            else if (acceptModuleSpecifier) {
                return getPackageNameFromModuleSpecifier(specifier);
            }
        }
        else if (specifier.includes('node_modules/.bin')) {
            return toBinary(stripBinaryPath(specifier));
        }
        else {
            return getPackageNameFromFilePath(specifier);
        }
    }
};
export const tryResolveSpecifiers = (cwd, specifiers) => specifiers.map(specifier => tryResolveFilePath(cwd, specifier, true));
export const toBinary = (specifier) => specifier.replace(/^(bin:)?/, 'bin:');
export const fromBinary = (specifier) => specifier.replace(/^(bin:)?/, '');
export const isBinary = (specifier) => specifier.startsWith('bin:');
export const stripVersionFromSpecifier = (specifier) => specifier.replace(/(\S+)@.*/, '$1');
const stripNodeModulesFromPath = (command) => command.replace(/^(\.\/)?node_modules\//, '');
export const stripBinaryPath = (command) => stripVersionFromSpecifier(stripNodeModulesFromPath(command)
    .replace(/^(\.bin\/)/, '')
    .replace(/\$\(npm bin\)\/(\w+)/, '$1'));
export const argsFrom = (args, from) => args.slice(args.indexOf(from));
