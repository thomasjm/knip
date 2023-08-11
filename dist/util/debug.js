import util from 'node:util';
import parsedArgValues from './cli-arguments.js';
const { debug, 'debug-file-filter': debugFileFilter } = parsedArgValues;
const IS_ENABLED = debug ?? false;
const FILE_FILTER = debugFileFilter;
const inspectOptions = { maxArrayLength: null, depth: null, colors: true };
const logArray = (collection) => {
    if (FILE_FILTER) {
        const fileFilter = new RegExp(FILE_FILTER);
        const files = collection.filter(filePath => fileFilter.test(filePath));
        console.log(util.inspect(files.sort(), inspectOptions));
    }
    else {
        console.log(util.inspect(collection.sort(), inspectOptions));
    }
};
export const debugLog = (message) => {
    if (!IS_ENABLED)
        return;
    console.log(`[knip] ${message}`);
};
export const debugLogObject = (name, obj) => {
    if (!IS_ENABLED)
        return;
    console.log(`[knip] ${name}`);
    console.log(util.inspect(obj, inspectOptions));
};
export const debugLogArray = (name, sourceFiles) => {
    if (!IS_ENABLED)
        return;
    const collection = Array.from(sourceFiles);
    console.debug(`[knip] ${name} (${collection.length})`);
    logArray(collection);
};
