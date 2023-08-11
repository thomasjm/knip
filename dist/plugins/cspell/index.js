import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'cspell';
export const ENABLERS = ['cspell'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    'cspell.config.{js,cjs,json,yaml,yml}',
    'cspell.{json,yaml,yml}',
    '.c{s,S}pell.json',
    'cSpell.json',
];
const findCspellDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    const imports = config?.import ?? [];
    return imports;
};
export const findDependencies = timerify(findCspellDependencies);
