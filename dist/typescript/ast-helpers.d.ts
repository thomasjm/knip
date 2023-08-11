import ts from 'typescript';
interface ValidImportTypeNode extends ts.ImportTypeNode {
    argument: ts.LiteralTypeNode & {
        literal: ts.StringLiteral;
    };
}
export declare function isValidImportTypeNode(node: ts.Node): node is ValidImportTypeNode;
export declare function isPrivateMember(node: ts.MethodDeclaration | ts.PropertyDeclaration): boolean;
export declare function isDefaultImport(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration): boolean;
export declare function isAccessExpression(node: ts.Node): node is ts.PropertyAccessExpression | ts.ElementAccessExpression;
export declare function isImportCall(node: ts.Node): node is ts.ImportCall;
export declare function isRequireCall(callExpression: ts.Node): callExpression is ts.CallExpression;
export declare function isRequireResolveCall(node: ts.Node): node is ts.CallExpression;
export declare function getAccessExpressionName(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string;
type LiteralLikeElementAccessExpression = ts.ElementAccessExpression & ts.Declaration & {
    readonly argumentExpression: ts.StringLiteralLike | ts.NumericLiteral;
};
export declare function isModuleExportsAccessExpression(node: ts.Node): node is LiteralLikeElementAccessExpression & {
    expression: ts.Identifier;
};
export declare function stripQuotes(name: string): string;
export declare function findAncestor<T>(node: ts.Node | undefined, callback: (element: ts.Node) => boolean | 'STOP'): T | undefined;
export declare function findDescendants<T>(node: ts.Node | undefined, callback: (element: ts.Node) => boolean | 'STOP'): T[];
export declare const isDeclarationFileExtension: (extension: string) => boolean;
export declare const isInModuleBlock: (node: ts.Node) => boolean;
export {};
