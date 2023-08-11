import type { AsyncCompilerFn, SyncCompilerFn } from '../types/compilers.js';
import type { RawConfiguration } from '../types/config.js';
export declare const partitionCompilers: (rawLocalConfig: RawConfiguration) => {
    syncCompilers: Record<string, SyncCompilerFn>;
    asyncCompilers: Record<string, AsyncCompilerFn>;
    exclude?: string[] | undefined;
    rules?: Partial<Record<"files" | "dependencies" | "devDependencies" | "unlisted" | "binaries" | "unresolved" | "exports" | "types" | "nsExports" | "nsTypes" | "duplicates" | "enumMembers" | "classMembers", "error" | "warn" | "off">> | undefined;
    entry?: string | string[] | undefined;
    project?: string | string[] | undefined;
    paths?: Record<string, string[]> | undefined;
    ignore?: string | string[] | undefined;
    ignoreBinaries?: string[] | undefined;
    ignoreExportsUsedInFile?: boolean | Partial<Record<"function" | "type" | "enum" | "class" | "interface" | "member", boolean>> | undefined;
    ignoreDependencies?: string[] | undefined;
    ignoreWorkspaces?: string[] | undefined;
    compilers?: Record<string, ((args_0: string, ...args_1: unknown[]) => string) | ((args_0: string, ...args_1: unknown[]) => Promise<string>)> | undefined;
    include?: string[] | undefined;
    workspaces?: Record<string, {
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
        paths?: Record<string, string[]> | undefined;
        ignore?: string | string[] | undefined;
        ignoreBinaries?: string[] | undefined;
        ignoreDependencies?: string[] | undefined;
        ava?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        babel?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        capacitor?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        changesets?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitizen?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        commitlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cspell?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        cypress?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        eslint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        gatsby?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'github-actions'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        husky?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        jest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        lefthook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'lint-staged'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        markdownlint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        mocha?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        next?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'npm-package-json-lint'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nx?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        nyc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        playwright?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        postcss?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        prettier?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'release-it'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remark?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        remix?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        rollup?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        'semantic-release'?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        sentry?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        storybook?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stryker?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        stylelint?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        tailwind?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typedoc?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        typescript?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vite?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        vitest?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
        webpack?: string | false | string[] | {
            config?: string | string[] | undefined;
            entry?: string | string[] | undefined;
            project?: string | string[] | undefined;
        } | undefined;
    }> | undefined;
    ava?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    babel?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    capacitor?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    changesets?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    commitizen?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    commitlint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    cspell?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    cypress?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    eslint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    gatsby?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'github-actions'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    husky?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    jest?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    lefthook?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'lint-staged'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    markdownlint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    mocha?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    next?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'npm-package-json-lint'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    nx?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    nyc?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    playwright?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    postcss?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    prettier?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'release-it'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    remark?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    remix?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    rollup?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    'semantic-release'?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    sentry?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    storybook?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    stryker?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    stylelint?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    tailwind?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    typedoc?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    typescript?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    vite?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    vitest?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
    webpack?: string | false | string[] | {
        config?: string | string[] | undefined;
        entry?: string | string[] | undefined;
        project?: string | string[] | undefined;
    } | undefined;
};
