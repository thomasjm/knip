import { isBuiltin } from 'node:module';
import { IGNORE_DEFINITELY_TYPED, IGNORED_DEPENDENCIES, IGNORED_GLOBAL_BINARIES, ROOT_WORKSPACE_NAME, } from './constants.js';
import { isDefinitelyTyped, getDefinitelyTypedFor, getPackageFromDefinitelyTyped } from './util/modules.js';
export class DependencyDeputy {
    isStrict;
    _manifests = new Map();
    referencedDependencies;
    referencedBinaries;
    peerDependencies;
    installedBinaries;
    ignoreBinaries = [];
    ignoreDependencies = [];
    constructor({ isStrict }) {
        this.isStrict = isStrict;
        this.referencedDependencies = new Map();
        this.referencedBinaries = new Map();
        this.peerDependencies = new Map();
        this.installedBinaries = new Map();
    }
    addWorkspace({ name, dir, manifestPath, manifest, ignoreDependencies, ignoreBinaries, }) {
        const scripts = Object.values(manifest.scripts ?? {});
        const dependencies = Object.keys(manifest.dependencies ?? {});
        const peerDependencies = Object.keys(manifest.peerDependencies ?? {});
        const optionalDependencies = Object.keys(manifest.optionalDependencies ?? {});
        const devDependencies = Object.keys(manifest.devDependencies ?? {});
        const allDependencies = [...dependencies, ...devDependencies, ...peerDependencies, ...optionalDependencies];
        this._manifests.set(name, {
            workspaceDir: dir,
            manifestPath,
            ignoreDependencies,
            ignoreBinaries,
            scripts,
            dependencies,
            peerDependencies,
            optionalDependencies,
            devDependencies,
            allDependencies,
        });
    }
    addIgnored(ignoreBinaries, ignoreDependencies) {
        this.ignoreBinaries = ignoreBinaries;
        this.ignoreDependencies = ignoreDependencies;
    }
    getWorkspaceManifest(workspaceName) {
        return this._manifests.get(workspaceName);
    }
    getProductionDependencies(workspaceName) {
        const manifest = this._manifests.get(workspaceName);
        if (!manifest)
            return [];
        if (this.isStrict)
            return [...manifest.dependencies, ...manifest.peerDependencies];
        return manifest.dependencies;
    }
    getDevDependencies(workspaceName) {
        return this._manifests.get(workspaceName)?.devDependencies ?? [];
    }
    setInstalledBinaries(workspaceName, installedBinaries) {
        this.installedBinaries.set(workspaceName, installedBinaries);
    }
    getInstalledBinaries(workspaceName) {
        return this.installedBinaries.get(workspaceName);
    }
    addReferencedDependency(workspaceName, packageName) {
        if (!this.referencedDependencies.has(workspaceName)) {
            this.referencedDependencies.set(workspaceName, new Set());
        }
        this.referencedDependencies.get(workspaceName)?.add(packageName);
    }
    addReferencedBinary(workspaceName, binaryName) {
        if (!this.referencedBinaries.has(workspaceName)) {
            this.referencedBinaries.set(workspaceName, new Set());
        }
        this.referencedBinaries.get(workspaceName)?.add(binaryName);
    }
    addPeerDependencies(workspaceName, peerDependencies) {
        this.peerDependencies.set(workspaceName, peerDependencies);
    }
    getPeerDependencies(workspaceName, dependency) {
        return Array.from(this.peerDependencies.get(workspaceName)?.get(dependency) ?? []);
    }
    maybeAddReferencedExternalDependency(workspace, packageName) {
        if (isBuiltin(packageName))
            return true;
        if (packageName === workspace.pkgName)
            return true;
        const workspaceNames = this.isStrict ? [workspace.name] : [workspace.name, ...[...workspace.ancestors].reverse()];
        const closestWorkspaceName = workspaceNames.find(name => this.isInDependencies(name, packageName));
        const typesPackageName = !isDefinitelyTyped(packageName) && getDefinitelyTypedFor(packageName);
        const closestWorkspaceNameForTypes = typesPackageName && workspaceNames.find(name => this.isInDependencies(name, typesPackageName));
        if (closestWorkspaceName || closestWorkspaceNameForTypes) {
            closestWorkspaceName && this.addReferencedDependency(closestWorkspaceName, packageName);
            closestWorkspaceNameForTypes && this.addReferencedDependency(closestWorkspaceNameForTypes, typesPackageName);
            return true;
        }
        else {
            this.addReferencedDependency(workspace.name, packageName);
        }
        if (this.getWorkspaceManifest(workspace.name)?.ignoreDependencies.includes(packageName))
            return true;
        if (this.ignoreDependencies.includes(packageName))
            return true;
        return false;
    }
    maybeAddReferencedBinary(workspace, binaryName) {
        if (IGNORED_GLOBAL_BINARIES.includes(binaryName))
            return true;
        this.addReferencedBinary(workspace.name, binaryName);
        const workspaceNames = this.isStrict ? [workspace.name] : [workspace.name, ...[...workspace.ancestors].reverse()];
        for (const name of workspaceNames) {
            const binaries = this.getInstalledBinaries(name);
            if (binaries?.has(binaryName)) {
                const dependencies = binaries.get(binaryName);
                if (dependencies?.size) {
                    dependencies.forEach(dependency => this.addReferencedDependency(name, dependency));
                    return true;
                }
            }
        }
        if (this.getWorkspaceManifest(workspace.name)?.ignoreBinaries.includes(binaryName))
            return true;
        if (this.ignoreBinaries.includes(binaryName))
            return true;
        return false;
    }
    isInDependencies(workspaceName, packageName) {
        const manifest = this._manifests.get(workspaceName);
        if (!manifest)
            return false;
        const dependencies = this.isStrict ? this.getProductionDependencies(workspaceName) : manifest.allDependencies;
        return dependencies.includes(packageName);
    }
    settleDependencyIssues() {
        const dependencyIssues = [];
        const devDependencyIssues = [];
        for (const [workspaceName, { manifestPath, ignoreDependencies, ignoreBinaries }] of this._manifests.entries()) {
            const referencedDependencies = this.referencedDependencies.get(workspaceName);
            const installedBinaries = this.getInstalledBinaries(workspaceName);
            const ignoreBins = [...IGNORED_GLOBAL_BINARIES, ...this.ignoreBinaries, ...ignoreBinaries];
            const ignoreDeps = [...IGNORED_DEPENDENCIES, ...this.ignoreDependencies, ...ignoreDependencies];
            const isNotIgnoredDependency = (packageName) => !ignoreDeps.includes(packageName);
            const isNotIgnoredBinary = (packageName) => {
                if (installedBinaries?.has(packageName)) {
                    const binaryNames = installedBinaries.get(packageName);
                    if (binaryNames) {
                        if (ignoreBins.some(ignoredBinary => binaryNames.has(ignoredBinary)))
                            return false;
                    }
                }
                return true;
            };
            const peerDepRecs = {};
            const isNotReferencedDependency = (dependency, isPeerDep) => {
                if (referencedDependencies?.has(dependency))
                    return false;
                if (isPeerDep && peerDepRecs[dependency])
                    return true;
                const [scope, typedDependency] = dependency.split('/');
                if (scope === '@types') {
                    const typedPackageName = getPackageFromDefinitelyTyped(typedDependency);
                    if (IGNORE_DEFINITELY_TYPED.includes(typedPackageName))
                        return false;
                    const peerDependencies = this.getPeerDependencies(workspaceName, typedPackageName);
                    if (peerDependencies.length) {
                        return !peerDependencies.find(peerDependency => !isNotReferencedDependency(peerDependency, true));
                    }
                    return !referencedDependencies?.has(typedPackageName);
                }
                const peerDependencies = this.getPeerDependencies(workspaceName, dependency);
                peerDependencies.forEach(dep => (!peerDepRecs[dep] ? (peerDepRecs[dep] = 1) : peerDepRecs[dep]++));
                return !peerDependencies.find(peerDependency => !isNotReferencedDependency(peerDependency, true));
            };
            const pd = this.getProductionDependencies(workspaceName);
            const dd = this.getDevDependencies(workspaceName);
            pd.filter(isNotIgnoredDependency)
                .filter(isNotIgnoredBinary)
                .filter(d => isNotReferencedDependency(d))
                .forEach(symbol => dependencyIssues.push({ type: 'dependencies', filePath: manifestPath, symbol }));
            dd.filter(isNotIgnoredDependency)
                .filter(isNotIgnoredBinary)
                .filter(d => isNotReferencedDependency(d))
                .forEach(symbol => devDependencyIssues.push({ type: 'devDependencies', filePath: manifestPath, symbol }));
        }
        return { dependencyIssues, devDependencyIssues };
    }
    getConfigurationHints() {
        const configurationHints = new Set();
        const rootIgnoreBinaries = Object.fromEntries(this.ignoreBinaries.map(key => [key, 0]));
        const rootIgnoreDependencies = Object.fromEntries(this.ignoreDependencies.map(key => [key, 0]));
        for (const [workspaceName, { ignoreDependencies, ignoreBinaries }] of this._manifests.entries()) {
            const referencedDependencies = this.referencedDependencies.get(workspaceName);
            const referencedBinaries = this.referencedBinaries.get(workspaceName);
            const installedBinaries = this.getInstalledBinaries(workspaceName);
            referencedDependencies?.forEach(pkg => pkg in rootIgnoreDependencies && rootIgnoreDependencies[pkg]++);
            referencedBinaries?.forEach(binaryName => binaryName in rootIgnoreBinaries && rootIgnoreBinaries[binaryName]++);
            const dependencies = this.isStrict
                ? this.getProductionDependencies(workspaceName)
                : [...this.getProductionDependencies(workspaceName), ...this.getDevDependencies(workspaceName)];
            const isReferencedDep = (name) => referencedDependencies?.has(name) && dependencies.includes(name);
            const isReferencedBin = (name) => referencedBinaries?.has(name) && installedBinaries?.has(name);
            ignoreDependencies
                .filter(packageName => IGNORED_DEPENDENCIES.includes(packageName) ||
                (workspaceName !== ROOT_WORKSPACE_NAME && this.ignoreDependencies.includes(packageName)) ||
                isReferencedDep(packageName))
                .forEach(identifier => configurationHints.add({ workspaceName, identifier, type: 'ignoreDependencies' }));
            ignoreBinaries
                .filter(binaryName => IGNORED_GLOBAL_BINARIES.includes(binaryName) ||
                (workspaceName !== ROOT_WORKSPACE_NAME && this.ignoreBinaries.includes(binaryName)) ||
                isReferencedBin(binaryName))
                .forEach(identifier => configurationHints.add({ workspaceName, identifier, type: 'ignoreBinaries' }));
        }
        const installedBinaries = this.getInstalledBinaries(ROOT_WORKSPACE_NAME);
        const dependencies = this.isStrict
            ? this.getProductionDependencies(ROOT_WORKSPACE_NAME)
            : [...this.getProductionDependencies(ROOT_WORKSPACE_NAME), ...this.getDevDependencies(ROOT_WORKSPACE_NAME)];
        Object.keys(rootIgnoreBinaries)
            .filter(key => IGNORED_GLOBAL_BINARIES.includes(key) || (rootIgnoreBinaries[key] !== 0 && installedBinaries?.has(key)))
            .forEach(identifier => configurationHints.add({ workspaceName: ROOT_WORKSPACE_NAME, identifier, type: 'ignoreBinaries' }));
        Object.keys(rootIgnoreDependencies)
            .filter(key => IGNORED_DEPENDENCIES.includes(key) || (rootIgnoreDependencies[key] !== 0 && dependencies.includes(key)))
            .forEach(identifier => configurationHints.add({ workspaceName: ROOT_WORKSPACE_NAME, identifier, type: 'ignoreDependencies' }));
        return { configurationHints };
    }
}
