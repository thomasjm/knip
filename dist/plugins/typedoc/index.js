import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
export const NAME = 'TypeDoc';
export const ENABLERS = ['typedoc'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = [
    'typedoc.{js,cjs,json,jsonc}',
    'typedoc.config.{js,cjs}',
    '.config/typedoc.{js,cjs,json,jsonc}',
    '.config/typedoc.config.{js,cjs}',
    'package.json',
    'tsconfig.json',
];
const findTypeDocDependencies = async (configFilePath, { manifest }) => {
    const config = configFilePath.endsWith('package.json')
        ? manifest.typedocOptions
        : configFilePath.endsWith('tsconfig.json')
            ? (await load(configFilePath)).typedocOptions
            : await load(configFilePath);
    return config?.plugin ?? [];
};
export const findDependencies = timerify(findTypeDocDependencies);
