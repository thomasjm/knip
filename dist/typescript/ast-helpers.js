import ts from 'typescript';
export function isValidImportTypeNode(node) {
    return ts.isImportTypeNode(node);
}
export function isPrivateMember(node) {
    return node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword) ?? false;
}
export function isDefaultImport(node) {
    return node.kind === ts.SyntaxKind.ImportDeclaration && !!node.importClause && !!node.importClause.name;
}
export function isAccessExpression(node) {
    return ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node);
}
export function isImportCall(node) {
    return (node.kind === ts.SyntaxKind.CallExpression &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword);
}
export function isRequireCall(callExpression) {
    if (callExpression.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    const { expression, arguments: args } = callExpression;
    if (expression.kind !== ts.SyntaxKind.Identifier || expression.escapedText !== 'require') {
        return false;
    }
    return args.length === 1;
}
export function isRequireResolveCall(node) {
    return (ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.getText() === 'require.resolve');
}
export function getAccessExpressionName(node) {
    return 'argumentExpression' in node ? stripQuotes(node.argumentExpression.getText()) : node.name.getText();
}
export function isModuleExportsAccessExpression(node) {
    return ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) &&
        ts.isIdentifier(node.expression) &&
        node.expression.escapedText === 'module' &&
        getAccessExpressionName(node) === 'exports');
}
export function stripQuotes(name) {
    const length = name.length;
    if (length >= 2 && name.charCodeAt(0) === name.charCodeAt(length - 1) && isQuoteOrBacktick(name.charCodeAt(0))) {
        return name.substring(1, length - 1);
    }
    return name;
}
var CharacterCodes;
(function (CharacterCodes) {
    CharacterCodes[CharacterCodes["backtick"] = 96] = "backtick";
    CharacterCodes[CharacterCodes["doubleQuote"] = 34] = "doubleQuote";
    CharacterCodes[CharacterCodes["singleQuote"] = 39] = "singleQuote";
})(CharacterCodes || (CharacterCodes = {}));
function isQuoteOrBacktick(charCode) {
    return (charCode === CharacterCodes.singleQuote ||
        charCode === CharacterCodes.doubleQuote ||
        charCode === CharacterCodes.backtick);
}
export function findAncestor(node, callback) {
    node = node?.parent;
    while (node) {
        const result = callback(node);
        if (result === 'STOP') {
            return undefined;
        }
        else if (result) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}
export function findDescendants(node, callback) {
    const results = [];
    if (!node)
        return results;
    function visit(node) {
        const result = callback(node);
        if (result === 'STOP') {
            return;
        }
        else if (result) {
            results.push(node);
        }
        ts.forEachChild(node, visit);
    }
    visit(node);
    return results;
}
export const isDeclarationFileExtension = (extension) => extension === '.d.ts' || extension === '.d.mts' || extension === '.d.cts';
export const isInModuleBlock = (node) => {
    node = node?.parent;
    while (node) {
        if (ts.isModuleBlock(node))
            return true;
        node = node.parent;
    }
    return false;
};
