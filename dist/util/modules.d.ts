import type { PackageJson } from '@npmcli/package-json';
export declare const getPackageNameFromModuleSpecifier: (moduleSpecifier: string) => string | undefined;
export declare const getPackageNameFromFilePath: (value: string) => string;
export declare const isMaybePackageName: (specifier: string) => boolean;
export declare const isDefinitelyTyped: (packageName: string) => boolean;
export declare const getDefinitelyTypedFor: (packageName: string) => string;
export declare const getPackageFromDefinitelyTyped: (typedDependency: string) => string;
export declare const getEntryPathFromManifest: (cwd: string, dir: string, manifest: PackageJson) => Promise<string[]>;
