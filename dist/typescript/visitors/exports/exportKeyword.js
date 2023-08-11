import ts from 'typescript';
import { SymbolType } from '../../../types/issues.js';
import { compact } from '../../../util/array.js';
import { isPrivateMember, stripQuotes } from '../../ast-helpers.js';
import { exportVisitor as visit } from '../index.js';
export default visit(() => true, node => {
    const modifierKinds = node.modifiers?.map(modifier => modifier.kind) ?? [];
    if (modifierKinds.includes(ts.SyntaxKind.ExportKeyword)) {
        if (ts.isVariableStatement(node)) {
            return node.declarationList.declarations.flatMap(declaration => {
                if (ts.isObjectBindingPattern(declaration.name)) {
                    return compact(declaration.name.elements.map(element => {
                        if (ts.isIdentifier(element.name)) {
                            return {
                                node: element,
                                identifier: element.name.escapedText.toString(),
                                type: SymbolType.UNKNOWN,
                                pos: element.name.getStart(),
                            };
                        }
                    }));
                }
                else if (ts.isArrayBindingPattern(declaration.name)) {
                    return compact(declaration.name.elements.map(element => {
                        if (ts.isBindingElement(element)) {
                            return {
                                node: element,
                                identifier: element.getText(),
                                type: SymbolType.UNKNOWN,
                                pos: element.getStart(),
                            };
                        }
                    }));
                }
                else {
                    const identifier = declaration.name.getText();
                    return { node: declaration, identifier, type: SymbolType.UNKNOWN, pos: declaration.name.getStart() };
                }
            });
        }
        if (ts.isFunctionDeclaration(node) && node.name) {
            const identifier = modifierKinds.includes(ts.SyntaxKind.DefaultKeyword) ? 'default' : node.name.getText();
            const pos = (node.name ?? node.body ?? node).getStart();
            return { node, identifier, pos, type: SymbolType.FUNCTION };
        }
        if (ts.isClassDeclaration(node) && node.name) {
            const identifier = modifierKinds.includes(ts.SyntaxKind.DefaultKeyword) ? 'default' : node.name.getText();
            const pos = (node.name ?? node).getStart();
            const members = node.members
                .filter((member) => (ts.isPropertyDeclaration(member) || ts.isMethodDeclaration(member)) && !isPrivateMember(member))
                .map(member => ({
                node: member,
                identifier: member.name.getText(),
                pos: member.name.getStart(),
                type: SymbolType.MEMBER,
            }));
            return { node, identifier, type: SymbolType.CLASS, pos, members };
        }
        if (ts.isTypeAliasDeclaration(node)) {
            return { node, identifier: node.name.getText(), type: SymbolType.TYPE, pos: node.name.getStart() };
        }
        if (ts.isInterfaceDeclaration(node)) {
            return { node, identifier: node.name.getText(), type: SymbolType.INTERFACE, pos: node.name.getStart() };
        }
        if (ts.isEnumDeclaration(node)) {
            const identifier = modifierKinds.includes(ts.SyntaxKind.DefaultKeyword) ? 'default' : node.name.getText();
            const pos = node.name.getStart();
            const members = node.members.map(member => ({
                node: member,
                identifier: stripQuotes(member.name.getText()),
                pos: member.name.getStart(),
                type: SymbolType.MEMBER,
            }));
            return { node, identifier, type: SymbolType.ENUM, pos, members };
        }
    }
});
