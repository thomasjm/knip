import ts from 'typescript';
import { isRequireCall, findAncestor, findDescendants } from '../../ast-helpers.js';
import { importVisitor as visit } from '../index.js';
export default visit(() => true, node => {
    if (isRequireCall(node)) {
        if (ts.isStringLiteralLike(node.arguments[0])) {
            const specifier = node.arguments[0].text;
            if (specifier) {
                const propertyAccessExpression = findAncestor(node, _node => {
                    if (ts.isExpressionStatement(_node) || ts.isCallExpression(_node))
                        return 'STOP';
                    return ts.isPropertyAccessExpression(_node);
                });
                if (propertyAccessExpression) {
                    const identifier = String(propertyAccessExpression.name.escapedText);
                    return { identifier, specifier };
                }
                else {
                    const variableDeclaration = node.parent;
                    if (ts.isVariableDeclaration(variableDeclaration) &&
                        ts.isVariableDeclarationList(variableDeclaration.parent)) {
                        if (ts.isIdentifier(variableDeclaration.name)) {
                            return { identifier: 'default', specifier };
                        }
                        else {
                            const bindings = findDescendants(variableDeclaration, ts.isBindingElement);
                            if (bindings.length > 0) {
                                return bindings.map(element => {
                                    const identifier = (element.propertyName ?? element.name).getText();
                                    return { identifier, specifier };
                                });
                            }
                            else {
                                return { identifier: 'default', specifier };
                            }
                        }
                    }
                    else {
                        return { identifier: 'default', specifier };
                    }
                }
            }
        }
    }
});
