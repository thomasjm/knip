/// <reference types="npmcli__package-json" />
import type { Workspace } from './ConfigurationChief.js';
import type { ConfigurationHints, Issue } from './types/issues.js';
import type { WorkspaceManifests } from './types/workspace.js';
import type { PeerDependencies, InstalledBinaries } from './types/workspace.js';
import type { PackageJson } from '@npmcli/package-json';
type Options = {
    isStrict: boolean;
};
export declare class DependencyDeputy {
    isStrict: boolean;
    _manifests: WorkspaceManifests;
    referencedDependencies: Map<string, Set<string>>;
    referencedBinaries: Map<string, Set<string>>;
    peerDependencies: Map<string, PeerDependencies>;
    installedBinaries: Map<string, InstalledBinaries>;
    ignoreBinaries: string[];
    ignoreDependencies: string[];
    constructor({ isStrict }: Options);
    addWorkspace({ name, dir, manifestPath, manifest, ignoreDependencies, ignoreBinaries, }: {
        name: string;
        dir: string;
        manifestPath: string;
        manifest: PackageJson;
        ignoreDependencies: string[];
        ignoreBinaries: string[];
    }): void;
    addIgnored(ignoreBinaries: string[], ignoreDependencies: string[]): void;
    getWorkspaceManifest(workspaceName: string): {
        workspaceDir: string;
        manifestPath: string;
        scripts: string[];
        dependencies: string[];
        peerDependencies: string[];
        optionalDependencies: string[];
        devDependencies: string[];
        allDependencies: string[];
        ignoreDependencies: string[];
        ignoreBinaries: string[];
    } | undefined;
    getProductionDependencies(workspaceName: string): string[];
    getDevDependencies(workspaceName: string): string[];
    setInstalledBinaries(workspaceName: string, installedBinaries: Map<string, Set<string>>): void;
    getInstalledBinaries(workspaceName: string): InstalledBinaries | undefined;
    addReferencedDependency(workspaceName: string, packageName: string): void;
    addReferencedBinary(workspaceName: string, binaryName: string): void;
    addPeerDependencies(workspaceName: string, peerDependencies: Map<string, Set<string>>): void;
    getPeerDependencies(workspaceName: string, dependency: string): string[];
    maybeAddReferencedExternalDependency(workspace: Workspace, packageName: string): boolean;
    maybeAddReferencedBinary(workspace: Workspace, binaryName: string): boolean;
    private isInDependencies;
    settleDependencyIssues(): {
        dependencyIssues: Issue[];
        devDependencyIssues: Issue[];
    };
    getConfigurationHints(): {
        configurationHints: ConfigurationHints;
    };
}
export {};
