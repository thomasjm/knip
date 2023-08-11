import parseArgs from 'minimist';
import { toBinary } from '../util.js';
const commands = [
    'add',
    'bin',
    'cache',
    'config',
    'constraints',
    'dedupe',
    'dlx',
    'explain',
    'info',
    'init',
    'install',
    'link',
    'pack',
    'patch',
    'patch-commit',
    'plugin',
    'rebuild',
    'remove',
    'search',
    'set',
    'stage',
    'unlink',
    'unplug',
    'up',
    'upgrade',
    'upgrade-interactive',
    'version',
    'why',
    'workspace',
    'workspaces',
];
export const resolve = (_binary, args, { manifest, fromArgs }) => {
    const scripts = manifest.scripts ? Object.keys(manifest.scripts) : [];
    const parsed = parseArgs(args, {});
    const [command, binary] = parsed._;
    if (scripts.includes(command) || commands.includes(command))
        return [];
    if (command === 'run' && scripts.includes(binary))
        return [];
    if (command === 'run' || command === 'exec')
        return [toBinary(binary)];
    if (command === 'node')
        return fromArgs(parsed._);
    return command ? [toBinary(command)] : [];
};
