const isAsync = (fn) => (fn ? fn.constructor.name === 'AsyncFunction' : false);
const normalizeExt = (ext) => ext.replace(/^\.*/, '.');
export const partitionCompilers = (rawLocalConfig) => {
    const syncCompilers = {};
    const asyncCompilers = {};
    for (const extension in rawLocalConfig.compilers) {
        const ext = normalizeExt(extension);
        if (!rawLocalConfig.asyncCompilers?.[ext] && isAsync(rawLocalConfig.compilers[extension])) {
            asyncCompilers[ext] = rawLocalConfig.compilers[extension];
        }
        else {
            syncCompilers[ext] = rawLocalConfig.compilers[extension];
        }
    }
    for (const extension in rawLocalConfig.asyncCompilers) {
        const ext = normalizeExt(extension);
        asyncCompilers[ext] = rawLocalConfig.asyncCompilers[extension];
    }
    return { ...rawLocalConfig, syncCompilers, asyncCompilers };
};
