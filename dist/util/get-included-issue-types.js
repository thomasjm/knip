import { ISSUE_TYPES } from '../constants.js';
export const getIncludedIssueTypes = (cliArgs, { include = [], exclude = [], isProduction = false } = {}) => {
    if (cliArgs.dependencies) {
        cliArgs.include = [...cliArgs.include, 'dependencies', 'unlisted', 'binaries', 'unresolved'];
    }
    if (cliArgs.exports) {
        const exports = ['exports', 'nsExports', 'classMembers', 'types', 'nsTypes', 'enumMembers', 'duplicates'];
        cliArgs.include = [...cliArgs.include, ...exports];
    }
    const normalizedIncludesArg = cliArgs.include.map(value => value.split(',')).flat();
    const normalizedExcludesArg = cliArgs.exclude.map(value => value.split(',')).flat();
    const excludes = exclude.filter(exclude => !normalizedIncludesArg.includes(exclude));
    const includes = include.filter(include => !normalizedExcludesArg.includes(include));
    const _include = [normalizedIncludesArg, includes].flat();
    const _exclude = [normalizedExcludesArg, excludes].flat();
    if (isProduction) {
        _exclude.push('types');
        _exclude.push('nsTypes');
        _exclude.push('enumMembers');
        _exclude.push('devDependencies');
    }
    else {
        if (_include.includes('dependencies'))
            _include.push('devDependencies');
        if (_exclude.includes('dependencies'))
            _exclude.push('devDependencies');
    }
    const included = (_include.length > 0 ? _include : ISSUE_TYPES).filter(group => !_exclude.includes(group));
    return ISSUE_TYPES.reduce((types, group) => ((types[group] = included.includes(group)), types), {});
};
