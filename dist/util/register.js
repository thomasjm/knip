import module from 'node:module';
import createJITI from 'jiti';
import { IGNORED_FILE_EXTENSIONS, DEFAULT_EXTENSIONS } from '../constants.js';
const _extensions = module.Module._extensions;
export const jiti = createJITI(process.cwd(), { interopDefault: true, extensions: DEFAULT_EXTENSIONS });
if (!('.ts' in _extensions)) {
    jiti.register();
}
const exportFilePath = (module, filePath) => {
    module.exports = filePath;
};
IGNORED_FILE_EXTENSIONS.forEach(ext => {
    _extensions[ext] = exportFilePath;
});
