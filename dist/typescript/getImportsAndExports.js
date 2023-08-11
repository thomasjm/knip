import { isBuiltin } from 'node:module';
import ts from 'typescript';
import { getOrSet } from '../util/map.js';
import { isMaybePackageName } from '../util/modules.js';
import { isInNodeModules } from '../util/path.js';
import { isDeclarationFileExtension, isAccessExpression, getAccessExpressionName } from './ast-helpers.js';
import getExportVisitors from './visitors/exports/index.js';
import { getJSXImplicitImportBase } from './visitors/helpers.js';
import getImportVisitors from './visitors/imports/index.js';
import getScriptVisitors from './visitors/scripts/index.js';
const getVisitors = (sourceFile) => ({
    export: getExportVisitors(sourceFile),
    import: getImportVisitors(sourceFile),
    script: getScriptVisitors(sourceFile),
});
export const getImportsAndExports = (sourceFile, options) => {
    const internalImports = new Map();
    const externalImports = new Set();
    const unresolvedImports = new Set();
    const exports = new Map();
    const aliasedExports = {};
    const scripts = new Set();
    const importedInternalSymbols = new Map();
    const jsxImport = getJSXImplicitImportBase(sourceFile);
    if (jsxImport)
        externalImports.add(jsxImport);
    const visitors = getVisitors(sourceFile);
    const addInternalImport = (options) => {
        const { identifier, specifier, symbol, filePath, isReExport } = options;
        const isStar = identifier === '*';
        const internalImport = getOrSet(internalImports, filePath, {
            specifier,
            isStar,
            isReExport,
            isReExportedBy: new Set(),
            symbols: new Set(),
        });
        if (isReExport) {
            internalImport.isReExport = isReExport;
            internalImport.isReExportedBy.add(sourceFile.fileName);
        }
        if (isStar)
            internalImport.isStar = isStar;
        if (!isStar)
            internalImport.symbols.add(identifier);
        if (isStar && symbol)
            importedInternalSymbols.set(symbol, filePath);
    };
    const addImport = (options) => {
        const { specifier, symbol, identifier = '__anonymous', isReExport = false } = options;
        if (isBuiltin(specifier))
            return;
        const module = sourceFile.resolvedModules?.get(specifier, undefined);
        if (module?.resolvedModule) {
            const filePath = module.resolvedModule.resolvedFileName;
            if (filePath) {
                if (module.resolvedModule.isExternalLibraryImport) {
                    if (!isInNodeModules(filePath)) {
                        addInternalImport({ identifier, specifier, symbol, filePath, isReExport });
                    }
                    if (!isMaybePackageName(specifier))
                        return;
                    if (isDeclarationFileExtension(module.resolvedModule.extension)) {
                        externalImports.add(specifier);
                    }
                    else {
                        externalImports.add(module.resolvedModule.packageId?.name ?? specifier);
                    }
                }
                else {
                    addInternalImport({ identifier, specifier, symbol, filePath, isReExport });
                }
            }
        }
        else {
            unresolvedImports.add(specifier);
        }
    };
    const maybeAddNamespaceAccessAsImport = ({ namespace, member }) => {
        const symbol = sourceFile.locals?.get(namespace);
        if (symbol) {
            const importedSymbolFilePath = importedInternalSymbols.get(symbol);
            if (importedSymbolFilePath) {
                const internalImport = internalImports.get(importedSymbolFilePath);
                internalImport?.symbols.add(member);
            }
        }
    };
    const addExport = ({ node, identifier, type, pos, members }) => {
        if (options.skipExports)
            return;
        if (exports.has(identifier)) {
            const item = exports.get(identifier);
            exports.set(identifier, { ...item, node, type, pos, members });
        }
        else {
            exports.set(identifier, { node, type, pos, members });
        }
        if (ts.isExportAssignment(node))
            maybeAddAliasedExport(node.expression, 'default');
        if (ts.isVariableDeclaration(node))
            maybeAddAliasedExport(node.initializer, identifier);
    };
    const maybeAddAliasedExport = (node, alias) => {
        const identifier = node?.getText();
        if (identifier && sourceFile.symbol?.exports?.has(identifier)) {
            aliasedExports[identifier] = aliasedExports[identifier] ?? [identifier];
            aliasedExports[identifier].push(alias);
        }
    };
    const visit = (node) => {
        for (const visitor of visitors.import) {
            if (visitor) {
                const results = visitor(node, options);
                if (results) {
                    [results].flat().forEach(addImport);
                    return;
                }
            }
        }
        for (const visitor of visitors.export) {
            if (visitor) {
                const results = visitor(node, options);
                if (results)
                    [results].flat().forEach(addExport);
            }
        }
        for (const visitor of visitors.script) {
            if (visitor) {
                const results = visitor(node, options);
                if (results) {
                    [results].flat().forEach(script => scripts.add(script));
                    return;
                }
            }
        }
        if (isAccessExpression(node)) {
            maybeAddNamespaceAccessAsImport({
                namespace: node.expression.getText(),
                member: getAccessExpressionName(node),
            });
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    return {
        imports: {
            internal: internalImports,
            external: externalImports,
            unresolved: unresolvedImports,
        },
        exports: {
            exported: exports,
            duplicate: Object.values(aliasedExports),
        },
        scripts,
    };
};
