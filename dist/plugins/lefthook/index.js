import { _getDependenciesFromScripts } from '../../binaries/index.js';
import { getValuesByKeyDeep } from '../../util/object.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Lefthook';
export const ENABLERS = ['lefthook', '@arkweid/lefthook'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['lefthook.yml'];
const findLefthookDependencies = async (configFilePath, { cwd, manifest }) => {
    const config = await load(configFilePath);
    if (!config)
        return [];
    const scripts = getValuesByKeyDeep(config, 'run').filter((value) => typeof value === 'string');
    return _getDependenciesFromScripts(scripts, {
        cwd,
        manifest,
        knownGlobalsOnly: true,
    });
};
export const findDependencies = timerify(findLefthookDependencies);
