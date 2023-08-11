import { initIssues, initCounters } from './issues/initializers.js';
import { relative } from './util/path.js';
function objectInSet(set, obj) {
    const objJSON = JSON.stringify(obj);
    return Array.from(set).some(item => JSON.stringify(item) === objJSON);
}
export class IssueCollector {
    cwd;
    rules;
    issues = initIssues();
    counters = initCounters();
    referencedFiles = new Set();
    configurationHints = new Set();
    constructor({ cwd, rules }) {
        this.cwd = cwd;
        this.rules = rules;
    }
    addFileCounts({ processed, unused }) {
        this.counters.processed += processed;
        this.counters.total += processed + unused;
    }
    addFilesIssues(filePaths) {
        filePaths.forEach(filePath => {
            if (!this.referencedFiles.has(filePath)) {
                this.issues.files.add(filePath);
                this.counters.files++;
                this.counters.processed++;
            }
        });
    }
    addIssue(issue) {
        const key = relative(this.cwd, issue.filePath);
        issue.severity = this.rules[issue.type];
        this.issues[issue.type][key] = this.issues[issue.type][key] ?? {};
        if (!this.issues[issue.type][key][issue.symbol]) {
            this.issues[issue.type][key][issue.symbol] = issue;
            this.counters[issue.type]++;
        }
    }
    addConfigurationHint(issue) {
        if (!objectInSet(this.configurationHints, issue)) {
            this.configurationHints.add(issue);
        }
    }
    getIssues() {
        return {
            issues: this.issues,
            counters: this.counters,
            configurationHints: this.configurationHints,
        };
    }
}
