import fg from 'fast-glob';
import { globby } from 'globby';
import { GLOBAL_IGNORE_PATTERNS, ROOT_WORKSPACE_NAME } from '../constants.js';
import { compact } from './array.js';
import { debugLogObject } from './debug.js';
import { join, relative } from './path.js';
import { timerify } from './Performance.js';
export const prependDirToPattern = (workingDir, pattern) => {
    if (pattern.startsWith('!'))
        return '!' + join(workingDir, pattern.slice(1));
    return join(workingDir, pattern);
};
export const negate = (pattern) => pattern.replace(/^!?/, '!');
export const hasProductionSuffix = (pattern) => pattern.endsWith('!');
export const hasNoProductionSuffix = (pattern) => !pattern.endsWith('!');
const removeProductionSuffix = (pattern) => pattern.replace(/!$/, '');
const negatedLast = (pattern) => (pattern.startsWith('!') ? 1 : -1);
const glob = async ({ cwd, workingDir = cwd, patterns, ignore = [], gitignore = true }) => {
    if (patterns.length === 0)
        return [];
    const relativePath = relative(cwd, workingDir);
    const prepend = (pattern) => prependDirToPattern(relativePath, pattern);
    const globPatterns = compact([patterns].flat().map(prepend).map(removeProductionSuffix)).sort(negatedLast);
    if (globPatterns[0].startsWith('!'))
        return [];
    const ignorePatterns = compact([...ignore, ...GLOBAL_IGNORE_PATTERNS]);
    debugLogObject(`Globbing (${relativePath || ROOT_WORKSPACE_NAME})`, { cwd, globPatterns, ignorePatterns });
    return globby(globPatterns, {
        cwd,
        ignore: ignorePatterns,
        gitignore,
        absolute: true,
        dot: true,
    });
};
const pureGlob = async ({ cwd, patterns, ignore = [], gitignore = true }) => {
    if (patterns.length === 0)
        return [];
    return globby(patterns, {
        cwd,
        ignore: [...ignore, ...GLOBAL_IGNORE_PATTERNS],
        gitignore,
        absolute: true,
    });
};
const firstGlob = async ({ cwd, patterns }) => {
    const stream = fg.stream(patterns.map(removeProductionSuffix), { cwd, ignore: GLOBAL_IGNORE_PATTERNS });
    for await (const entry of stream) {
        return entry;
    }
};
const dirGlob = async ({ cwd, patterns }) => globby(patterns, {
    cwd,
    onlyDirectories: true,
});
export const _glob = timerify(glob);
export const _pureGlob = timerify(pureGlob);
export const _firstGlob = timerify(firstGlob);
export const _dirGlob = timerify(dirGlob);
