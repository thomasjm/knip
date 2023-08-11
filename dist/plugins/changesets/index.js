import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Changesets';
export const ENABLERS = ['@changesets/cli'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['.changeset/config.json'];
const findChangesetsDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    return Array.isArray(config.changelog)
        ? [config.changelog[0]]
        : typeof config.changelog === 'string'
            ? [config.changelog]
            : [];
};
export const findDependencies = timerify(findChangesetsDependencies);
