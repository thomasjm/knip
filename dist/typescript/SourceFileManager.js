import ts from 'typescript';
import { debugLog } from '../util/debug.js';
import { extname, isInternal } from '../util/path.js';
export class SourceFileManager {
    sourceFileCache = new Map();
    snapshotCache = new Map();
    syncCompilers;
    asyncCompilers;
    installCompilers(compilers) {
        this.syncCompilers = compilers[0];
        this.asyncCompilers = compilers[1];
    }
    createSourceFile(filePath, contents) {
        const setParentNodes = isInternal(filePath);
        const sourceFile = ts.createSourceFile(filePath, contents, ts.ScriptTarget.Latest, setParentNodes);
        this.sourceFileCache.set(filePath, sourceFile);
        return sourceFile;
    }
    getSourceFile(filePath) {
        if (this.sourceFileCache.has(filePath))
            return this.sourceFileCache.get(filePath);
        const contents = ts.sys.readFile(filePath);
        if (typeof contents !== 'string')
            throw new Error(`Unable to read ${filePath}`);
        const ext = extname(filePath);
        const compiler = this.syncCompilers?.get(ext);
        const compiled = compiler ? compiler(contents, filePath) : contents;
        if (compiler)
            debugLog(`Compiled ${filePath}`);
        return this.createSourceFile(filePath, compiled);
    }
    getSnapshot(filePath) {
        if (this.snapshotCache.has(filePath))
            return this.snapshotCache.get(filePath);
        const sourceFile = this.getSourceFile(filePath);
        if (!sourceFile)
            return undefined;
        const snapshot = ts.ScriptSnapshot.fromString(sourceFile.text);
        this.snapshotCache.set(filePath, snapshot);
        return snapshot;
    }
    async compileAndAddSourceFile(filePath) {
        const contents = ts.sys.readFile(filePath);
        if (typeof contents !== 'string')
            throw new Error(`Unable to read ${filePath}`);
        const ext = extname(filePath);
        const compiler = this.asyncCompilers?.get(ext);
        if (compiler) {
            const compiled = await compiler(contents, filePath);
            debugLog(`Compiled ${filePath}`);
            this.createSourceFile(filePath, compiled);
        }
    }
}
