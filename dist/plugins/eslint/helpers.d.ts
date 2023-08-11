/// <reference types="npmcli__package-json" />
import type { ESLintConfig } from './types.js';
import type { PackageJson } from '@npmcli/package-json';
type Manifest = PackageJson & {
    eslintConfig?: ESLintConfig;
};
type GetDependenciesDeep = (configFilePath: string, dependencies: Set<string>, options: {
    cwd: string;
    manifest: Manifest;
}) => Promise<Set<string>>;
export declare const getDependenciesDeep: GetDependenciesDeep;
export declare const resolvePluginSpecifier: (specifier: string) => string;
export declare const resolveExtendSpecifier: (specifier: string) => string | undefined;
export {};
