import type { Report } from '../types/issues.js';
type CLIArguments = {
    include: string[];
    exclude: string[];
    dependencies: boolean;
    exports: boolean;
};
type Options = {
    isProduction?: boolean;
    include?: string[];
    exclude?: string[];
    dependencies?: boolean;
    exports?: boolean;
};
export declare const getIncludedIssueTypes: (cliArgs: CLIArguments, { include, exclude, isProduction }?: Options) => Report;
export {};
