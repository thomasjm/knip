import ts from 'typescript';
import exportAssignment from './exportAssignment.js';
import exportDeclaration from './exportDeclaration.js';
import exportKeyword from './exportKeyword.js';
import moduleExportsAccessExpression from './moduleExportsAccessExpression.js';
const visitors = [exportAssignment, exportDeclaration, exportKeyword, moduleExportsAccessExpression];
export default (sourceFile) => visitors.map(v => v(sourceFile)).filter(v => v);
