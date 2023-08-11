import { EOL } from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { createCustomModuleResolver } from './resolveModuleNames.js';
import { SourceFileManager } from './SourceFileManager.js';
import { createCustomSys } from './sys.js';
const libLocation = path.dirname(ts.getDefaultLibFilePath({}));
const fileManager = new SourceFileManager();
export const createHosts = ({ cwd, compilerOptions, entryPaths, compilers }) => {
    fileManager.installCompilers(compilers);
    const virtualFileExtensions = [...compilers[0].keys(), ...compilers[1].keys()];
    const sys = createCustomSys(cwd, virtualFileExtensions);
    const resolveModuleNames = createCustomModuleResolver(sys, compilerOptions, virtualFileExtensions);
    const languageServiceHost = {
        getCompilationSettings: () => compilerOptions,
        getScriptFileNames: () => Array.from(entryPaths),
        getScriptVersion: () => '0',
        getScriptSnapshot: (fileName) => fileManager.getSnapshot(fileName),
        getCurrentDirectory: sys.getCurrentDirectory,
        getDefaultLibFileName: ts.getDefaultLibFilePath,
        readFile: sys.readFile,
        fileExists: sys.fileExists,
        resolveModuleNames,
    };
    const compilerHost = {
        writeFile: () => undefined,
        getDefaultLibLocation: () => libLocation,
        getDefaultLibFileName: languageServiceHost.getDefaultLibFileName,
        getSourceFile: (fileName) => fileManager.getSourceFile(fileName),
        getCurrentDirectory: languageServiceHost.getCurrentDirectory,
        getCanonicalFileName: (fileName) => fileName,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => EOL,
        readFile: languageServiceHost.readFile,
        fileExists: languageServiceHost.fileExists,
        resolveModuleNames: languageServiceHost.resolveModuleNames,
    };
    return { fileManager, languageServiceHost, compilerHost };
};
