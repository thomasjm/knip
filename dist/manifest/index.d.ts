/// <reference types="npmcli__package-json" />
import type { InstalledBinaries, PeerDependencies } from '../types/workspace.js';
import type { PackageJson } from '@npmcli/package-json';
type Options = {
    manifest: PackageJson;
    isProduction: boolean;
    isStrict: boolean;
    dir: string;
    cwd: string;
};
export declare const findDependencies: ({ manifest, isProduction, isStrict, dir, cwd }: Options) => Promise<{
    dependencies: string[];
    peerDependencies: PeerDependencies;
    installedBinaries: InstalledBinaries;
}>;
export {};
