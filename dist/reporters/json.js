import { OwnershipEngine } from '@snyk/github-codeowners/dist/lib/ownership/index.js';
import { isFile } from '../util/fs.js';
import { relative, resolve } from '../util/path.js';
const mergeTypes = (type) => type === 'exports' || type === 'nsExports' ? 'exports' : type === 'types' || type === 'nsTypes' ? 'types' : type;
export default async ({ report, issues, options }) => {
    let opts = {};
    try {
        opts = options ? JSON.parse(options) : opts;
    }
    catch (error) {
        console.error(error);
    }
    const json = {};
    const codeownersFilePath = resolve(opts.codeowners ?? '.github/CODEOWNERS');
    const codeownersEngine = isFile(codeownersFilePath) && OwnershipEngine.FromCodeownersFile(codeownersFilePath);
    const flatten = (issues) => Object.values(issues).map(Object.values).flat();
    const initRow = (filePath) => {
        const file = relative(filePath);
        const row = {
            file,
            ...(codeownersEngine && { owners: codeownersEngine.calcFileOwnership(file) }),
            ...(report.files && { files: false }),
            ...(report.dependencies && { dependencies: [] }),
            ...(report.devDependencies && { devDependencies: [] }),
            ...(report.unlisted && { unlisted: [] }),
            ...(report.unresolved && { unresolved: [] }),
            ...((report.exports || report.nsExports) && { exports: [] }),
            ...((report.types || report.nsTypes) && { types: [] }),
            ...(report.enumMembers && { enumMembers: {} }),
            ...(report.classMembers && { classMembers: {} }),
            ...(report.duplicates && { duplicates: [] }),
        };
        return row;
    };
    for (const [reportType, isReportType] of Object.entries(report)) {
        if (isReportType) {
            if (reportType === 'files') {
                Array.from(issues[reportType]).forEach(filePath => {
                    json[filePath] = json[filePath] ?? initRow(filePath);
                    json[filePath][reportType] = true;
                });
            }
            else {
                const type = mergeTypes(reportType);
                flatten(issues[reportType]).forEach(issue => {
                    const { filePath, symbol, symbols, parentSymbol } = issue;
                    json[filePath] = json[filePath] ?? initRow(filePath);
                    if (type === 'duplicates') {
                        symbols && json[filePath][type]?.push(symbols);
                    }
                    else if (type === 'enumMembers' || type === 'classMembers') {
                        const item = json[filePath][type];
                        if (parentSymbol && item) {
                            item[parentSymbol] = item[parentSymbol] ?? [];
                            item[parentSymbol].push(symbol);
                        }
                    }
                    else {
                        json[filePath][type]?.push(symbol);
                    }
                });
            }
        }
    }
    console.log(JSON.stringify(Object.values(json)));
};
