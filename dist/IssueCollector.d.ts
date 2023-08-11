import type { ConfigurationHint, Issue, Rules } from './types/issues.js';
type IssueCollectorOptions = {
    cwd: string;
    rules: Rules;
};
export declare class IssueCollector {
    private cwd;
    private rules;
    private issues;
    private counters;
    private referencedFiles;
    private configurationHints;
    constructor({ cwd, rules }: IssueCollectorOptions);
    addFileCounts({ processed, unused }: {
        processed: number;
        unused: number;
    }): void;
    addFilesIssues(filePaths: string[]): void;
    addIssue(issue: Issue): void;
    addConfigurationHint(issue: ConfigurationHint): void;
    getIssues(): {
        issues: import("./types/issues.js").Issues;
        counters: import("./types/issues.js").Counters;
        configurationHints: Set<ConfigurationHint>;
    };
}
export {};
