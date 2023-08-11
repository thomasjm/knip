import { timerify } from '../../util/Performance.js';
import { hasDependency } from '../../util/plugin.js';
import { getDependenciesDeep } from './helpers.js';
export const NAME = 'ESLint';
export const ENABLERS = ['eslint'];
export const isEnabled = ({ dependencies, manifest }) => hasDependency(dependencies, ENABLERS) ||
    Boolean(manifest.name && /(^eslint-config|\/eslint-config)/.test(manifest.name));
export const CONFIG_FILE_PATTERNS = ['.eslintrc', '.eslintrc.{js,json,cjs}', '.eslintrc.{yml,yaml}', 'package.json'];
export const ENTRY_FILE_PATTERNS = ['eslint.config.js'];
const findESLintDependencies = async (configFilePath, { cwd, manifest }) => {
    const dependencies = await getDependenciesDeep(configFilePath, new Set(), { cwd, manifest });
    return Array.from(dependencies);
};
export const findDependencies = timerify(findESLintDependencies);
