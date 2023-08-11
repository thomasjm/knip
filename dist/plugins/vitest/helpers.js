const environments = {
    node: null,
    jsdom: null,
    'happy-dom': null,
    'edge-runtime': null,
};
const envPackageNames = {
    jsdom: 'jsdom',
    'happy-dom': 'happy-dom',
    'edge-runtime': '@edge-runtime/vm',
};
export const getEnvPackageName = (env) => {
    if (env === 'node')
        return null;
    if (env in envPackageNames)
        return envPackageNames[env];
    return `vitest-environment-${env}`;
};
const builtInReporters = ['default', 'verbose', 'dot', 'json', 'tap', 'tap-flat', 'junit', 'hanging-process'];
export const getExternalReporters = (reporters) => reporters
    ? [reporters].flat().filter(reporter => typeof reporter === 'string' && !builtInReporters.includes(reporter))
    : [];
