import ts from 'typescript';
import { importVisitor as visit } from '../index.js';
export default visit(() => true, node => {
    if (ts.isExportDeclaration(node)) {
        if (node.moduleSpecifier && ts.isStringLiteralLike(node.moduleSpecifier)) {
            if (!node.exportClause) {
                return { identifier: '*', specifier: node.moduleSpecifier.text, isReExport: true };
            }
            else if (node.exportClause.kind === ts.SyntaxKind.NamespaceExport) {
                return { identifier: '*', specifier: node.moduleSpecifier.text, isReExport: true };
            }
            else {
                const specifier = node.moduleSpecifier;
                return node.exportClause.elements.map(element => {
                    const identifier = (element.propertyName ?? element.name).getText();
                    return { identifier, specifier: specifier.text, isReExport: true };
                });
            }
        }
    }
});
