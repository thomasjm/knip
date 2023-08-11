import parseArgs from 'minimist';
import { compact } from '../../util/array.js';
import { toBinary, tryResolveSpecifiers } from '../util.js';
export const resolve = (binary, args, { cwd, fromArgs }) => {
    const safeArgs = args.filter(arg => arg !== '--watch');
    const parsed = parseArgs(safeArgs, { alias: { plugin: 'p' } });
    const watchers = parsed.watch ? fromArgs(Object.values(parsed.watch)) : [];
    const plugins = parsed.plugin ? tryResolveSpecifiers(cwd, [parsed.plugin].flat()) : [];
    const configPlugins = parsed.configPlugin ? tryResolveSpecifiers(cwd, [parsed.configPlugin].flat()) : [];
    return compact([toBinary(binary), ...watchers, ...plugins, ...configPlugins]);
};
