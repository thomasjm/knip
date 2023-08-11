import ts from 'typescript';
import { ensureRealFilePath } from './utils.js';
export function createCustomSys(cwd, virtualFileExtensions) {
    const sys = {
        ...ts.sys,
        getCurrentDirectory: () => cwd,
    };
    if (virtualFileExtensions.length === 0)
        return sys;
    return {
        ...sys,
        fileExists(path) {
            return ts.sys.fileExists(ensureRealFilePath(path, virtualFileExtensions));
        },
    };
}
