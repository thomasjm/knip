import ts from 'typescript';
import type { SyncCompilers, AsyncCompilers } from '../types/compilers.js';
export declare class SourceFileManager {
    sourceFileCache: Map<string, ts.SourceFile | undefined>;
    snapshotCache: Map<string, ts.IScriptSnapshot | undefined>;
    syncCompilers?: SyncCompilers;
    asyncCompilers?: AsyncCompilers;
    installCompilers(compilers: [SyncCompilers, AsyncCompilers]): void;
    createSourceFile(filePath: string, contents: string): ts.SourceFile;
    getSourceFile(filePath: string): ts.SourceFile | undefined;
    getSnapshot(filePath: string): ts.IScriptSnapshot | undefined;
    compileAndAddSourceFile(filePath: string): Promise<void>;
}
