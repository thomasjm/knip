import { _getDependenciesFromScripts } from '../binaries/index.js';
import { timerify } from '../util/Performance.js';
import { getPackageManifest } from './helpers.js';
const findManifestDependencies = async ({ manifest, isProduction, isStrict, dir, cwd }) => {
    const scriptFilter = isProduction ? ['start', 'postinstall'] : [];
    const peerDependencies = new Map();
    const scripts = Object.entries(manifest.scripts ?? {}).reduce((scripts, [scriptName, script]) => {
        if (script && (scriptFilter.length === 0 || scriptFilter.includes(scriptName))) {
            return [...scripts, script];
        }
        return scripts;
    }, []);
    const dependencies = _getDependenciesFromScripts(scripts, { cwd: dir, manifest });
    const installedBinaries = new Map();
    const packageNames = [
        ...Object.keys(manifest.dependencies ?? {}),
        ...(isStrict ? Object.keys(manifest.peerDependencies ?? {}) : []),
        ...(isProduction ? [] : Object.keys(manifest.devDependencies ?? {})),
    ];
    for (const packageName of packageNames) {
        const manifest = await getPackageManifest({ dir, packageName, cwd });
        if (manifest) {
            const binaryName = packageName.replace(/^@[^/]+\//, '');
            const binaries = typeof manifest.bin === 'string' ? [binaryName] : Object.keys(manifest.bin ?? {});
            binaries.forEach(binaryName => {
                if (installedBinaries.has(binaryName)) {
                    installedBinaries.get(binaryName)?.add(packageName);
                }
                else {
                    installedBinaries.set(binaryName, new Set([packageName]));
                }
                if (installedBinaries.has(packageName)) {
                    installedBinaries.get(packageName)?.add(binaryName);
                }
                else {
                    installedBinaries.set(packageName, new Set([binaryName]));
                }
            });
            const packagePeerDependencies = Object.keys(manifest.peerDependencies ?? {});
            packagePeerDependencies.forEach(packagePeerDependency => {
                if (peerDependencies.has(packagePeerDependency)) {
                    peerDependencies.get(packagePeerDependency)?.add(packageName);
                }
                else {
                    peerDependencies.set(packagePeerDependency, new Set([packageName]));
                }
            });
        }
    }
    return {
        dependencies,
        peerDependencies,
        installedBinaries,
    };
};
export const findDependencies = timerify(findManifestDependencies);
