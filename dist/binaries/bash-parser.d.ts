import type { PackageJson } from '@npmcli/package-json';
export declare const getBinariesFromScript: (script: string, { cwd, manifest, knownGlobalsOnly }: {
    cwd: string;
    manifest: PackageJson;
    knownGlobalsOnly?: boolean | undefined;
}) => string[];
