import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
import { getArgumentValues } from './helpers.js';
export const NAME = 'markdownlint';
export const ENABLERS = ['markdownlint-cli'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['.markdownlint.{json,jsonc}', '.markdownlint.{yml,yaml}'];
const findMarkdownlintConfigDependencies = async (configFilePath, { manifest }) => {
    const config = await load(configFilePath);
    const extend = config?.extends ? [config.extends] : [];
    const scripts = manifest.scripts
        ? Object.values(manifest.scripts).filter((script) => typeof script === 'string')
        : [];
    const uses = scripts
        .filter(script => script.includes('markdownlint '))
        .flatMap(script => getArgumentValues(script, / (--rules|-r)[ =]([^ ]+)/g));
    return [...extend, ...uses];
};
export const findDependencies = timerify(findMarkdownlintConfigDependencies);
