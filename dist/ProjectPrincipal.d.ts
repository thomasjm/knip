import ts from 'typescript';
import { SourceFileManager } from './typescript/SourceFileManager.js';
import type { SyncCompilers, AsyncCompilers } from './types/compilers.js';
import type { ExportItem, ExportItemMember } from './types/exports.js';
type ProjectPrincipalOptions = {
    compilerOptions: ts.CompilerOptions;
    cwd: string;
    compilers: [SyncCompilers, AsyncCompilers];
};
export declare class ProjectPrincipal {
    entryPaths: Set<string>;
    projectPaths: Set<string>;
    skipExportsAnalysis: Set<string>;
    cwd: string;
    compilerOptions: ts.CompilerOptions;
    extensions: Set<string>;
    syncCompilers: SyncCompilers;
    asyncCompilers: AsyncCompilers;
    backend: {
        fileManager: SourceFileManager;
        compilerHost: ts.CompilerHost;
        languageServiceHost: ts.LanguageServiceHost;
        lsFindReferences: ts.LanguageService['findReferences'];
        program?: ts.Program;
    };
    constructor({ compilerOptions, cwd, compilers }: ProjectPrincipalOptions);
    private createProgram;
    private hasAcceptedExtension;
    addEntryPath(filePath: string, options?: {
        skipExportsAnalysis: boolean;
    }): void;
    addEntryPaths(filePaths: Set<string> | string[], options?: {
        skipExportsAnalysis: boolean;
    }): void;
    addProjectPath(filePath: string): void;
    runAsyncCompilers(): Promise<void>;
    getUsedResolvedFiles(): string[];
    private getProgramSourceFiles;
    getUnreferencedFiles(): string[];
    analyzeSourceFile(filePath: string, { skipTypeOnly }: {
        skipTypeOnly: boolean;
    }): {
        imports: {
            internal: import("./types/imports.js").Imports;
            unresolved: Set<string>;
            external: Set<string>;
        };
        exports: {
            exported: import("./types/exports.js").ExportItems;
            duplicate: string[][];
        };
        scripts: Set<string>;
    };
    private resolveModule;
    getHasReferences(filePath: string, exportedItem: ExportItem): {
        external: boolean;
        internal: boolean;
    };
    findUnusedMembers(filePath: string, members: ExportItemMember[]): string[];
    private findReferences;
    isPublicExport(exportedItem: ExportItem): ts.JSDocPublicTag | undefined;
}
export {};
