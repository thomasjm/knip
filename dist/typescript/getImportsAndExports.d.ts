import ts from 'typescript';
import type { BoundSourceFile } from './SourceFile.js';
import type { ExportItems as Exports, ExportItem } from '../types/exports.js';
import type { Imports } from '../types/imports.js';
export type GetImportsAndExportsOptions = {
    skipTypeOnly: boolean;
    skipExports: boolean;
};
export type AddImportOptions = {
    specifier: string;
    symbol?: ts.Symbol;
    identifier?: string;
    isReExport?: boolean;
};
export type AddExportOptions = ExportItem & {
    identifier: string;
};
export declare const getImportsAndExports: (sourceFile: BoundSourceFile, options: GetImportsAndExportsOptions) => {
    imports: {
        internal: Imports;
        external: Set<string>;
        unresolved: Set<string>;
    };
    exports: {
        exported: Exports;
        duplicate: string[][];
    };
    scripts: Set<string>;
};
