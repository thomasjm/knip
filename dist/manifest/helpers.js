import { join } from '../util/path.js';
import { _require } from '../util/require.js';
export const getPackageManifest = async ({ dir, packageName, cwd }) => {
    try {
        return _require(join(dir, 'node_modules', packageName, 'package.json'));
    }
    catch (error) {
        if (dir !== cwd) {
            try {
                return _require(join(cwd, 'node_modules', packageName, 'package.json'));
            }
            catch (error) {
            }
        }
    }
};
