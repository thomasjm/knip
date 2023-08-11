import { readFileSync } from 'fs';
import { _getDependenciesFromScripts } from '../../binaries/index.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency } from '../../util/plugin.js';
import { getGitHooksPath } from './helpers.js';
export const NAME = 'husky';
export const ENABLERS = ['husky'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
const gitHooksPath = getGitHooksPath();
export const CONFIG_FILE_PATTERNS = [
    `${gitHooksPath}/prepare-commit-msg`,
    `${gitHooksPath}/commit-msg`,
    `${gitHooksPath}/pre-{applypatch,commit,merge-commit,push,rebase,receive}`,
    `${gitHooksPath}/post-{checkout,commit,merge,rewrite}`,
];
const findHuskyDependencies = async (configFilePath, { cwd, manifest }) => {
    const script = readFileSync(configFilePath);
    return _getDependenciesFromScripts(String(script), {
        cwd,
        manifest,
        knownGlobalsOnly: true,
    });
};
export const findDependencies = timerify(findHuskyDependencies);
