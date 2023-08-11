import ts from 'typescript';
import type { SymbolType } from './issues.js';
type FilePath = string;
type Identifier = string;
export type ExportItem = {
    node: ts.Node;
    pos: number;
    type: SymbolType;
    members?: ExportItemMember[];
};
export type ExportItemMember = {
    node: ts.Node;
    identifier: Identifier;
    pos: number;
    type: SymbolType;
};
export type ExportItems = Map<string, ExportItem>;
export type Exports = Map<FilePath, ExportItems>;
export {};
