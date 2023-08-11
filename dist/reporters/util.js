import chalk from 'chalk';
import { ISSUE_TYPE_TITLE } from '../constants.js';
import { toRelative, relative } from '../util/path.js';
export const identity = (text) => text;
export const getTitle = (reportType) => {
    return ISSUE_TYPE_TITLE[reportType];
};
export const logTitle = (title, count) => console.log(`${chalk.bold.yellow.underline(title)} (${count})`);
export const logIssueLine = ({ owner, filePath, symbols, parentSymbol, severity }) => {
    const symbol = symbols ? `: ${symbols.join(', ')}` : '';
    const parent = parentSymbol ? ` (${parentSymbol})` : '';
    const print = severity === 'warn' ? chalk.grey : identity;
    console.log(`${owner ? `${chalk.cyan(owner)} ` : ''}${print(`${relative(filePath)}${symbol}${parent}`)}`);
};
export const logIssueSet = (issues) => {
    issues.sort().forEach(value => console.log(toRelative(value)));
};
