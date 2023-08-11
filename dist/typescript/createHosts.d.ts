import ts from 'typescript';
import { SourceFileManager } from './SourceFileManager.js';
import type { SyncCompilers, AsyncCompilers } from '../types/compilers.js';
type CreateHostsOptions = {
    cwd: string;
    compilerOptions: ts.CompilerOptions;
    entryPaths: Set<string>;
    compilers: [SyncCompilers, AsyncCompilers];
};
export declare const createHosts: ({ cwd, compilerOptions, entryPaths, compilers }: CreateHostsOptions) => {
    fileManager: SourceFileManager;
    languageServiceHost: ts.LanguageServiceHost;
    compilerHost: ts.CompilerHost;
};
export {};
