/// <reference types="npmcli__package-json" />
import type { SyncCompilers, AsyncCompilers } from './types/compilers.js';
import type { Configuration, WorkspaceConfiguration } from './types/config.js';
import type { PackageJson } from '@npmcli/package-json';
type ConfigurationManagerOptions = {
    cwd: string;
    isProduction: boolean;
};
export type Workspace = {
    name: string;
    pkgName?: string;
    dir: string;
    ancestors: string[];
    config: WorkspaceConfiguration;
};
export declare class ConfigurationChief {
    cwd: string;
    isProduction: boolean;
    config: Configuration;
    manifestPath?: string;
    manifest?: PackageJson;
    ignoredWorkspacePatterns: string[];
    manifestWorkspaces: Map<string, string>;
    additionalWorkspaceNames: Set<string>;
    enabledWorkspaceNames: string[];
    enabledWorkspaceDirs: string[];
    enabledWorkspaces: Workspace[];
    localWorkspaces: Set<string>;
    resolvedConfigFilePath?: string;
    constructor({ cwd, isProduction }: ConfigurationManagerOptions);
    init(): Promise<void>;
    getCompilers(): [SyncCompilers, AsyncCompilers];
    getRules(): import("./types/issues.js").Rules;
    private normalize;
    private setWorkspaces;
    private getListedWorkspaces;
    private getIgnoredWorkspacePatterns;
    private getManifestWorkspaces;
    private getAdditionalWorkspaceNames;
    private getEnabledWorkspaceNames;
    private getEnabledWorkspaces;
    getWorkspaces(): Workspace[];
    private getDescendentWorkspaces;
    private getIgnoredWorkspacesFor;
    getNegatedWorkspacePatterns(name: string): string[];
    private getConfigKeyForWorkspace;
    private getConfigForWorkspace;
    getIssueTypesToReport(): import("./types/issues.js").Report;
    findWorkspaceByFilePath(filePath: string): Workspace | undefined;
    findWorkspaceByPackageName(packageName: string): Workspace | undefined;
    getUnusedIgnoredWorkspaces(): string[];
}
export {};
