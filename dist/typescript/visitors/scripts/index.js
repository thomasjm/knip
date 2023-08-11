import ts from 'typescript';
import execa from './execa.js';
import zx from './zx.js';
const visitors = [execa, zx];
export default (sourceFile) => visitors.map(v => v(sourceFile)).filter(v => v);
