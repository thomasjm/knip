import { _getDependenciesFromScripts } from '../../binaries/index.js';
import { compact } from '../../util/array.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Nx';
export const ENABLERS = ['nx', /^@nrwl\//];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['project.json', '{apps,libs}/**/project.json'];
const findNxDependencies = async (configFilePath, { cwd, manifest }) => {
    const config = await load(configFilePath);
    if (!config)
        return [];
    const targets = config.targets ? Object.values(config.targets) : [];
    const executors = compact(targets
        .map(target => target?.executor)
        .filter(executor => executor && !executor.startsWith('.'))
        .map(executor => executor?.split(':')[0]));
    const scripts = compact(targets
        .filter(target => target.executor === 'nx:run-commands')
        .flatMap(target => target.options?.commands ?? (target.options?.command ? [target.options.command] : [])));
    const dependencies = _getDependenciesFromScripts(scripts, { cwd, manifest });
    return [...executors, ...dependencies];
};
export const findDependencies = timerify(findNxDependencies);
