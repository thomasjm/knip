import { ISSUE_TYPE_TITLE } from '../constants.js';
import type { IssueSeverity } from '../types/issues.js';
export declare const identity: (text: string) => string;
export declare const getTitle: (reportType: keyof typeof ISSUE_TYPE_TITLE) => string;
export declare const logTitle: (title: string, count: number) => void;
type LogIssueLine = {
    owner?: string;
    filePath: string;
    symbols?: string[];
    parentSymbol?: string;
    severity?: IssueSeverity;
};
export declare const logIssueLine: ({ owner, filePath, symbols, parentSymbol, severity }: LogIssueLine) => void;
export declare const logIssueSet: (issues: string[]) => void;
export {};
