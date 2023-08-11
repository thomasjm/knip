import ts from 'typescript';
import { isDefaultImport } from '../../ast-helpers.js';
import { importVisitor as visit } from '../index.js';
export default visit(() => true, (node, options) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier)) {
        const specifier = node.moduleSpecifier.text;
        if (!node.importClause) {
            return { specifier };
        }
        else {
            if (node.importClause.isTypeOnly && options.skipTypeOnly)
                return;
            const imports = [];
            if (isDefaultImport(node)) {
                imports.push({ specifier, identifier: 'default' });
            }
            if (node.importClause?.namedBindings) {
                if (ts.isNamespaceImport(node.importClause.namedBindings)) {
                    const symbol = node.importClause.namedBindings.symbol;
                    imports.push({ symbol, specifier, identifier: '*' });
                }
                if (ts.isNamedImports(node.importClause.namedBindings)) {
                    node.importClause.namedBindings.elements.forEach(element => {
                        const identifier = (element.propertyName ?? element.name).getText();
                        imports.push({ symbol: element.symbol, specifier, identifier });
                    });
                }
            }
            return imports;
        }
    }
});
