function toRealFilePath(filePath) {
    return filePath.slice(0, -'.ts'.length);
}
export function isVirtualFilePath(filePath, extensions) {
    return extensions.some(extension => filePath.endsWith(`${extension}.ts`));
}
export function ensureRealFilePath(filePath, extensions) {
    return isVirtualFilePath(filePath, extensions) ? toRealFilePath(filePath) : filePath;
}
