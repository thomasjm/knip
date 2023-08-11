import ts from 'typescript';
import type { GetImportsAndExportsOptions, AddExportOptions, AddImportOptions } from '../getImportsAndExports.js';
type FileCondition = (sourceFile: ts.SourceFile) => boolean;
type VisitorFactory<T> = (fileCondition: FileCondition, fn: Visitor<T>) => VisitorCondition<T>;
type VisitorCondition<T> = (sourceFile: ts.SourceFile) => undefined | Visitor<T>;
type Visitor<T> = (node: ts.Node, options: GetImportsAndExportsOptions) => undefined | T | T[];
export declare const importVisitor: VisitorFactory<AddImportOptions>;
export declare const exportVisitor: VisitorFactory<AddExportOptions>;
export declare const scriptVisitor: VisitorFactory<string>;
export {};
