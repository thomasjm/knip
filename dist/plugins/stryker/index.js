import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'Stryker';
export const ENABLERS = ['@stryker-mutator/core'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['?(.)stryker.{conf,config}.{js,mjs,cjs,json}'];
const findStrykerDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    if (config) {
        const runners = config.testRunner ? [`@stryker-mutator/${config.testRunner}-runner`] : [];
        const checkers = config.checkers ? config.checkers.map(checker => `@stryker-mutator/${checker}-checker`) : [];
        const plugins = config.plugins ?? [];
        return [...runners, ...checkers, ...plugins];
    }
    return [];
};
export const findDependencies = timerify(findStrykerDependencies);
