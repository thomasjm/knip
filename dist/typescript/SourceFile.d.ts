import ts from 'typescript';
type SymbolTable = Map<string, ts.Symbol>;
type SymbolWithExports = ts.Symbol & {
    exports?: SymbolTable;
};
type PragmaMap = {
    arguments: {
        factory: string;
    };
};
export interface BoundSourceFile extends ts.SourceFile {
    symbol?: SymbolWithExports;
    resolvedModules?: ts.ModeAwareCache<ts.ResolvedModuleWithFailedLookupLocations>;
    locals?: SymbolTable;
    scriptKind?: ts.ScriptKind;
    pragmas?: Map<string, PragmaMap | PragmaMap[]>;
}
export {};
