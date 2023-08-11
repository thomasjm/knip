import ts from 'typescript';
export const isNotJS = (sourceFile) => sourceFile.scriptKind !== ts.ScriptKind.JS && sourceFile.scriptKind !== ts.ScriptKind.JSX;
export const isJS = (sourceFile) => sourceFile.scriptKind === ts.ScriptKind.JS || sourceFile.scriptKind === ts.ScriptKind.JSX;
export function getJSXImplicitImportBase(sourceFile) {
    const jsxImportSourcePragmas = sourceFile.pragmas?.get('jsximportsource');
    const jsxImportSourcePragma = Array.isArray(jsxImportSourcePragmas)
        ? jsxImportSourcePragmas[jsxImportSourcePragmas.length - 1]
        : jsxImportSourcePragmas;
    return jsxImportSourcePragma?.arguments.factory;
}
