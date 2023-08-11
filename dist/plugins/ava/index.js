import { _getDependenciesFromScripts } from '../../binaries/index.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Ava';
export const ENABLERS = ['ava'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['ava.config.{js,cjs,mjs}', 'package.json'];
export const ENTRY_FILE_PATTERNS = [];
const findAvaDependencies = async (configFilePath, { cwd, manifest }) => {
    const config = configFilePath.endsWith('package.json') ? manifest.ava : await load(configFilePath);
    const requireArgs = (config?.require ?? []).map(require => `--require ${require}`);
    const otherArgs = config?.nodeArguments ?? [];
    const cmd = `node ${otherArgs.join(' ') + ' '}${requireArgs.join(' ')}`;
    return _getDependenciesFromScripts([cmd], {
        cwd,
        manifest,
        knownGlobalsOnly: true,
    });
};
export const findDependencies = timerify(findAvaDependencies);
