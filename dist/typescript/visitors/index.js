import ts from 'typescript';
export const importVisitor = (fileCondition, visitorFn) => sourceFile => {
    if (fileCondition(sourceFile)) {
        return (node, options) => visitorFn(node, options);
    }
};
export const exportVisitor = (fileCondition, visitorFn) => sourceFile => {
    if (fileCondition(sourceFile)) {
        return (node, options) => visitorFn(node, options);
    }
};
export const scriptVisitor = (fileCondition, visitorFn) => sourceFile => {
    if (fileCondition(sourceFile)) {
        return (node, options) => visitorFn(node, options);
    }
};
