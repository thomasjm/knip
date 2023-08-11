import ts from 'typescript';
import { ensureRealFilePath, isVirtualFilePath } from './utils.js';
export function createCustomModuleResolver(customSys, compilerOptions, virtualFileExtensions) {
    function resolveModuleNames(moduleNames, containingFile) {
        return moduleNames.map(moduleName => resolveModuleName(moduleName, containingFile));
    }
    function resolveModuleName(name, containingFile) {
        const tsResolvedModule = ts.resolveModuleName(name, containingFile, compilerOptions, ts.sys).resolvedModule;
        if (virtualFileExtensions.length === 0)
            return tsResolvedModule;
        if (tsResolvedModule && !isVirtualFilePath(tsResolvedModule.resolvedFileName, virtualFileExtensions)) {
            return tsResolvedModule;
        }
        const customResolvedModule = ts.resolveModuleName(name, containingFile, compilerOptions, customSys).resolvedModule;
        if (!customResolvedModule || !isVirtualFilePath(customResolvedModule.resolvedFileName, virtualFileExtensions)) {
            return customResolvedModule;
        }
        const resolvedFileName = ensureRealFilePath(customResolvedModule.resolvedFileName, virtualFileExtensions);
        const resolvedModule = {
            extension: ts.Extension.Js,
            resolvedFileName,
            isExternalLibraryImport: customResolvedModule.isExternalLibraryImport,
        };
        return resolvedModule;
    }
    return resolveModuleNames;
}
