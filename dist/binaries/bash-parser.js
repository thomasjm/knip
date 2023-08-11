import parse from '@ericcornelissen/bash-parser';
import { debugLogObject } from '../util/debug.js';
import * as FallbackResolver from './resolvers/fallback.js';
import * as KnownResolvers from './resolvers/index.js';
import { stripBinaryPath } from './util.js';
export const getBinariesFromScript = (script, { cwd, manifest, knownGlobalsOnly = false }) => {
    if (!script)
        return [];
    const fromArgs = (args) => getBinariesFromScript(args.filter(arg => arg !== '--').join(' '), { cwd, manifest });
    const getBinariesFromNodes = (nodes) => nodes.flatMap(node => {
        switch (node.type) {
            case 'Command': {
                const binary = node.name?.text ? stripBinaryPath(node.name.text) : node.name?.text;
                const commandExpansions = node.prefix?.flatMap(prefix => prefix.expansion?.filter(expansion => expansion.type === 'CommandExpansion') ?? []) ?? [];
                if (commandExpansions.length > 0) {
                    return commandExpansions.flatMap(expansion => getBinariesFromNodes(expansion.commandAST.commands)) ?? [];
                }
                if (!binary || binary === '.' || binary === 'source')
                    return [];
                if (binary.startsWith('-') || binary.startsWith('"') || binary.startsWith('..'))
                    return [];
                if (['bun', 'deno'].includes(binary))
                    return [];
                const args = node.suffix?.map(arg => arg.text) ?? [];
                if (['!', 'test'].includes(binary))
                    return fromArgs(args);
                if (binary in KnownResolvers) {
                    return KnownResolvers[binary].resolve(binary, args, { cwd, manifest, fromArgs });
                }
                if (knownGlobalsOnly)
                    return [];
                return FallbackResolver.resolve(binary, args, { cwd, manifest, fromArgs });
            }
            case 'LogicalExpression':
                return getBinariesFromNodes([node.left, node.right]);
            case 'If':
                return getBinariesFromNodes([...node.clause.commands, ...node.then.commands, ...(node.else?.commands ?? [])]);
            case 'For':
                return getBinariesFromNodes(node.do.commands);
            case 'CompoundList':
                return getBinariesFromNodes(node.commands);
            default:
                return [];
        }
    });
    try {
        const parsed = parse(script);
        return parsed?.commands ? getBinariesFromNodes(parsed.commands) : [];
    }
    catch (error) {
        debugLogObject('Bash parser error', error);
        return [];
    }
};
