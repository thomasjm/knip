import ts from 'typescript';
import { DEFAULT_EXTENSIONS } from './constants.js';
import { IGNORED_FILE_EXTENSIONS } from './constants.js';
import { isInModuleBlock } from './typescript/ast-helpers.js';
import { createHosts } from './typescript/createHosts.js';
import { getImportsAndExports } from './typescript/getImportsAndExports.js';
import { SourceFileManager } from './typescript/SourceFileManager.js';
import { isMaybePackageName } from './util/modules.js';
import { extname, isInNodeModules } from './util/path.js';
import { timerify } from './util/Performance.js';
const baseCompilerOptions = {
    allowJs: true,
    jsx: ts.JsxEmit.Preserve,
    jsxImportSource: undefined,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    skipDefaultLibCheck: true,
    skipLibCheck: true,
    lib: [],
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
};
const tsCreateProgram = timerify(ts.createProgram);
export class ProjectPrincipal {
    entryPaths = new Set();
    projectPaths = new Set();
    skipExportsAnalysis = new Set();
    cwd;
    compilerOptions;
    extensions;
    syncCompilers;
    asyncCompilers;
    backend;
    constructor({ compilerOptions, cwd, compilers }) {
        this.cwd = cwd;
        this.compilerOptions = {
            ...compilerOptions,
            ...baseCompilerOptions,
            allowNonTsExtensions: [...compilers].flat().length > 0,
        };
        const [syncCompilers, asyncCompilers] = compilers;
        this.extensions = new Set([...DEFAULT_EXTENSIONS, ...syncCompilers.keys(), ...asyncCompilers.keys()]);
        this.syncCompilers = syncCompilers;
        this.asyncCompilers = asyncCompilers;
        const { fileManager, compilerHost, languageServiceHost } = createHosts({
            cwd: this.cwd,
            compilerOptions: this.compilerOptions,
            entryPaths: this.entryPaths,
            compilers: [this.syncCompilers, this.asyncCompilers],
        });
        const languageService = ts.createLanguageService(languageServiceHost, ts.createDocumentRegistry());
        const lsFindReferences = timerify(languageService?.findReferences);
        this.backend = {
            fileManager,
            compilerHost,
            languageServiceHost,
            lsFindReferences,
        };
    }
    createProgram() {
        this.backend.program = tsCreateProgram(Array.from(this.entryPaths), this.compilerOptions, this.backend.compilerHost, this.backend.program);
        const typeChecker = timerify(this.backend.program.getTypeChecker);
        typeChecker();
    }
    hasAcceptedExtension(filePath) {
        return this.extensions.has(extname(filePath));
    }
    addEntryPath(filePath, options) {
        if (!isInNodeModules(filePath) && this.hasAcceptedExtension(filePath)) {
            this.entryPaths.add(filePath);
            this.projectPaths.add(filePath);
            if (options?.skipExportsAnalysis)
                this.skipExportsAnalysis.add(filePath);
        }
    }
    addEntryPaths(filePaths, options) {
        filePaths.forEach(filePath => this.addEntryPath(filePath, options));
    }
    addProjectPath(filePath) {
        if (!isInNodeModules(filePath) && this.hasAcceptedExtension(filePath)) {
            this.projectPaths.add(filePath);
        }
    }
    async runAsyncCompilers() {
        const add = timerify(this.backend.fileManager.compileAndAddSourceFile.bind(this.backend.fileManager));
        const extensions = Array.from(this.asyncCompilers.keys());
        const files = Array.from(this.projectPaths).filter(filePath => extensions.includes(extname(filePath)));
        for (const filePath of files) {
            await add(filePath);
        }
    }
    getUsedResolvedFiles() {
        this.createProgram();
        const sourceFiles = this.getProgramSourceFiles();
        return Array.from(this.projectPaths).filter(filePath => sourceFiles.has(filePath));
    }
    getProgramSourceFiles() {
        const programSourceFiles = this.backend.program?.getSourceFiles().map(sourceFile => sourceFile.fileName);
        return new Set(programSourceFiles);
    }
    getUnreferencedFiles() {
        const sourceFiles = this.getProgramSourceFiles();
        return Array.from(this.projectPaths).filter(filePath => !sourceFiles.has(filePath));
    }
    analyzeSourceFile(filePath, { skipTypeOnly }) {
        const sourceFile = this.backend.program?.getSourceFile(filePath);
        if (!sourceFile)
            throw new Error(`Unable to find ${filePath}`);
        const skipExports = this.skipExportsAnalysis.has(filePath);
        const { imports, exports, scripts } = getImportsAndExports(sourceFile, { skipTypeOnly, skipExports });
        const { internal, unresolved, external } = imports;
        const unresolvedImports = new Set();
        unresolved.forEach(specifier => {
            if (specifier.startsWith('http')) {
                return;
            }
            const resolvedModule = this.resolveModule(specifier, filePath);
            if (resolvedModule) {
                if (resolvedModule.isExternalLibraryImport) {
                    external.add(specifier);
                }
                else {
                    this.addEntryPath(resolvedModule.resolvedFileName, { skipExportsAnalysis: true });
                }
            }
            else {
                if (isMaybePackageName(specifier)) {
                    external.add(specifier);
                }
                else {
                    const ext = extname(specifier);
                    if (!ext || (ext !== '.json' && !IGNORED_FILE_EXTENSIONS.includes(ext))) {
                        unresolvedImports.add(specifier);
                    }
                }
            }
        });
        return {
            imports: {
                internal,
                unresolved: unresolvedImports,
                external,
            },
            exports,
            scripts,
        };
    }
    resolveModule(specifier, filePath = specifier) {
        const module = ts.resolveModuleName(specifier, filePath, this.compilerOptions, this.backend.languageServiceHost);
        return module?.resolvedModule;
    }
    getHasReferences(filePath, exportedItem) {
        const hasReferences = { external: false, internal: false };
        const node = ts.isExportAssignment(exportedItem.node) ? exportedItem.node.getChildAt(1) : exportedItem.node;
        const symbolReferences = this.findReferences(filePath, node).flatMap(f => f.references);
        for (const reference of symbolReferences) {
            if (reference.fileName === filePath) {
                if (!reference.isDefinition) {
                    hasReferences.internal = true;
                }
            }
            else {
                hasReferences.external = true;
            }
        }
        if (!hasReferences.external && hasReferences.internal) {
            hasReferences.external = isInModuleBlock(exportedItem.node);
        }
        return hasReferences;
    }
    findUnusedMembers(filePath, members) {
        return members
            .filter(member => {
            if (this.isPublicExport(member))
                return false;
            const referencedSymbols = this.findReferences(filePath, member.node);
            const files = referencedSymbols
                .flatMap(refs => refs.references)
                .filter(ref => !ref.isDefinition)
                .map(ref => ref.fileName);
            const internalRefs = files.filter(f => f === filePath);
            const externalRefs = files.filter(f => f !== filePath);
            return externalRefs.length === 0 && internalRefs.length === 0;
        })
            .map(member => member.identifier);
    }
    findReferences(filePath, node) {
        return this.backend.lsFindReferences(filePath, node.getStart()) ?? [];
    }
    isPublicExport(exportedItem) {
        return ts.getJSDocPublicTag(exportedItem.node);
    }
}
