import type { BoundSourceFile } from '../SourceFile.js';
export declare const isNotJS: (sourceFile: BoundSourceFile) => boolean;
export declare const isJS: (sourceFile: BoundSourceFile) => boolean;
export declare function getJSXImplicitImportBase(sourceFile: BoundSourceFile): string | undefined;
