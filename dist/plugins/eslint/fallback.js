import createJITI from 'jiti';
import transform from 'jiti/dist/babel.js';
import { timerify } from '../../util/Performance.js';
const rushstackMatch = /require\(("|')@rushstack\/(eslint-config\/patch|eslint-patch)\/modern-module-resolution("|')\)/;
const jiti = createJITI(process.cwd(), {
    cache: false,
    transform: (opts) => {
        opts.source = opts.source.replace(rushstackMatch, '');
        return transform(opts);
    },
});
const load = (configFilePath) => jiti(configFilePath);
export const fallback = timerify(load);
