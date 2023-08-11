import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'commitlint';
export const ENABLERS = ['@commitlint/cli'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    '.commitlintrc',
    '.commitlintrc.{json,yaml,yml,js,cjs,ts,cts}',
    'commitlint.config.{js,cjs,ts,cts}',
    'package.json',
];
const findCommitLintDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest.commitlint
        : await load(configFilePath);
    return config?.extends ? [config.extends].flat() : [];
};
export const findDependencies = timerify(findCommitLintDependencies);
