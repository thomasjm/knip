import type { CommandLineOptions } from './types/cli.js';
export type { RawConfiguration as KnipConfig } from './types/config.js';
export type { Reporter, ReporterOptions } from './types/issues.js';
export declare const main: (unresolvedConfiguration: CommandLineOptions) => Promise<{
    report: import("./types/issues.js").Report;
    issues: import("./types/issues.js").Issues;
    counters: import("./types/issues.js").Counters;
    rules: import("./types/issues.js").Rules;
    configurationHints: Set<import("./types/issues.js").ConfigurationHint>;
}>;
