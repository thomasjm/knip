import { compact } from '../util/array.js';
import { getPackageNameFromModuleSpecifier } from '../util/modules.js';
import { isInternal } from '../util/path.js';
import { timerify } from '../util/Performance.js';
import { getBinariesFromScript } from './bash-parser.js';
import { isBinary } from './util.js';
const defaultCwd = process.cwd();
const getDependenciesFromScripts = (npmScripts, options = {}) => {
    const { cwd = defaultCwd, manifest = {}, knownGlobalsOnly = false } = options;
    const scripts = typeof npmScripts === 'string' ? [npmScripts] : [...npmScripts];
    const results = scripts.flatMap(script => getBinariesFromScript(script, { cwd, manifest, knownGlobalsOnly }));
    return compact(results.map(identifier => {
        if (isBinary(identifier) || isInternal(identifier))
            return identifier;
        return getPackageNameFromModuleSpecifier(identifier);
    }));
};
export const _getDependenciesFromScripts = timerify(getDependenciesFromScripts);
