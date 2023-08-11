import parseArgs from 'minimist';
import { compact } from '../../util/array.js';
import { toBinary, tryResolveFilePath, tryResolveSpecifiers } from '../util.js';
const withPositional = parsed => [parsed._[0], parsed.require].flat();
const withoutPositional = parsed => [parsed.require].flat();
const argFilters = {
    'babel-node': withPositional,
    esbuild: withPositional,
    execa: withPositional,
    nodemon: withPositional,
    'ts-node': withPositional,
    zx: withPositional,
    tsx: parsed => parsed._.filter(p => p !== 'watch'),
    default: withoutPositional,
};
const spawningBinaries = ['cross-env', 'retry-cli'];
export const resolve = (binary, args, { cwd, fromArgs }) => {
    const parsed = parseArgs(args, { string: ['r'], alias: { require: ['r', 'loader'] }, boolean: ['quiet', 'verbose'] });
    const bin = binary.startsWith('.') ? tryResolveFilePath(cwd, binary) : toBinary(binary);
    const filteredArgs = binary in argFilters ? argFilters[binary](parsed) : argFilters.default(parsed);
    const shiftedArgs = spawningBinaries.includes(binary) ? fromArgs(args) : [];
    return compact([bin, ...tryResolveSpecifiers(cwd, filteredArgs), ...shiftedArgs]);
};
