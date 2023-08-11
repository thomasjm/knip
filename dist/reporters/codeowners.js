import { OwnershipEngine } from '@snyk/github-codeowners/dist/lib/ownership/index.js';
import chalk from 'chalk';
import { toRelative, relative, resolve } from '../util/path.js';
import { getTitle, logTitle, logIssueLine } from './util.js';
const logIssueSet = (issues) => {
    issues
        .sort((a, b) => (a.owner < b.owner ? -1 : 1))
        .forEach(issue => console.log(chalk.cyan(issue.owner), toRelative(issue.symbol)));
};
const logIssueRecord = (issues) => {
    const sortedByFilePath = issues.sort((a, b) => (a.owner < b.owner ? -1 : 1));
    sortedByFilePath.forEach(({ filePath, symbols, owner, parentSymbol }) => logIssueLine({ owner, filePath, symbols, parentSymbol }));
};
export default ({ report, issues, isShowProgress, options }) => {
    let opts = {};
    try {
        opts = options ? JSON.parse(options) : opts;
    }
    catch (error) {
        console.error(error);
    }
    const codeownersFilePath = resolve(opts.path ?? '.github/CODEOWNERS');
    const codeownersEngine = OwnershipEngine.FromCodeownersFile(codeownersFilePath);
    const reportMultipleGroups = Object.values(report).filter(Boolean).length > 1;
    const [dependenciesOwner = '[no-owner]'] = codeownersEngine.calcFileOwnership('package.json');
    const fallbackOwner = dependenciesOwner;
    let totalIssues = 0;
    const calcFileOwnership = (filePath) => codeownersEngine.calcFileOwnership(relative(filePath))[0] ?? fallbackOwner;
    const addOwner = (issue) => ({ ...issue, owner: calcFileOwnership(issue.filePath) });
    for (const [reportType, isReportType] of Object.entries(report)) {
        if (isReportType) {
            const title = reportMultipleGroups && getTitle(reportType);
            const isSet = issues[reportType] instanceof Set;
            const toIssue = (filePath) => ({ type: reportType, filePath, symbol: filePath });
            const issuesForType = issues[reportType] instanceof Set
                ? Array.from(issues[reportType])
                    .map(toIssue)
                    .map(addOwner)
                : reportType === 'duplicates'
                    ? Object.values(issues[reportType]).map(Object.values).flat().map(addOwner)
                    : Object.values(issues[reportType]).map(issues => {
                        const items = Object.values(issues);
                        return addOwner({ ...items[0], symbols: items.map(issue => issue.symbol) });
                    });
            if (issuesForType.length > 0) {
                if (totalIssues)
                    console.log();
                title && logTitle(title, issuesForType.length);
                if (isSet) {
                    logIssueSet(issuesForType);
                }
                else {
                    logIssueRecord(issuesForType);
                }
            }
            totalIssues = totalIssues + issuesForType.length;
        }
    }
    if (totalIssues === 0 && isShowProgress) {
        console.log('✂️  Excellent, Knip found no issues.');
    }
};
