import parseArgs from 'minimist';
import { toBinary } from '../util.js';
const commands = [
    'add',
    'dedupe',
    'dlx',
    'run',
    'i',
    'install',
    'up',
    'update',
    'upgrade',
    'remove',
    'rm',
    'uninstall',
    'un',
    'link',
    'ln',
    'unlink',
    'import',
    'rebuild',
    'rb',
    'prune',
    'fetch',
    'install-test',
    'it',
    'patch',
    'patch-commit',
    'audit',
    'list',
    'ls',
    'outdated',
    'why',
    'test',
    't',
    'tst',
];
export const resolve = (_binary, args, { manifest }) => {
    const scripts = manifest.scripts ? Object.keys(manifest.scripts) : [];
    const parsed = parseArgs(args, {});
    const [command, binary] = parsed._;
    if (scripts.includes(command) || commands.includes(command))
        return [];
    if (command === 'exec')
        return [toBinary(binary)];
    return command ? [toBinary(command)] : [];
};
