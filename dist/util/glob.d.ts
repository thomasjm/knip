/// <reference types="node" resolution-mode="require"/>
export declare const prependDirToPattern: (workingDir: string, pattern: string) => string;
export declare const negate: (pattern: string) => string;
export declare const hasProductionSuffix: (pattern: string) => boolean;
export declare const hasNoProductionSuffix: (pattern: string) => boolean;
interface BaseGlobOptions {
    cwd: string;
    patterns: string[];
    ignore?: string[];
    gitignore?: boolean;
}
interface GlobOptions extends BaseGlobOptions {
    workingDir?: string;
}
export declare const _glob: ({ cwd, workingDir, patterns, ignore, gitignore }: GlobOptions) => Promise<string[]>;
export declare const _pureGlob: ({ cwd, patterns, ignore, gitignore }: BaseGlobOptions) => Promise<string[]>;
export declare const _firstGlob: ({ cwd, patterns }: BaseGlobOptions) => Promise<string | Buffer | undefined>;
export declare const _dirGlob: ({ cwd, patterns }: BaseGlobOptions) => Promise<string[]>;
export {};
