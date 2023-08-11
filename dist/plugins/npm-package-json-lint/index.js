import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'npm-package-json-lint';
export const ENABLERS = ['npm-package-json-lint'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['.npmpackagejsonlintrc.json', 'npmpackagejsonlint.config.js', 'package.json'];
const findNpmPkgJsonLintConfigDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest.npmpackagejsonlint
        : await load(configFilePath);
    return config?.extends ? [config.extends] : [];
};
export const findDependencies = timerify(findNpmPkgJsonLintConfigDependencies);
