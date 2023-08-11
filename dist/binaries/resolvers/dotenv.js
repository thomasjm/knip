import parseArgs from 'minimist';
import { toBinary, argsFrom } from '../util.js';
export const resolve = (binary, args, { fromArgs }) => {
    const parsed = parseArgs(args);
    return [toBinary(binary), ...fromArgs(argsFrom(args, parsed._[0]))];
};
