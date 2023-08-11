/// <reference types="npmcli__package-json" />
import type { PluginConfiguration } from './config.js';
import type { PackageJson } from '@npmcli/package-json';
export type PackageJsonWithPlugins = PackageJson & Record<string, unknown>;
type IsPluginEnabledCallbackOptions = {
    cwd: string;
    manifest: PackageJson;
    dependencies: Set<string>;
};
export type IsPluginEnabledCallback = (options: IsPluginEnabledCallbackOptions) => boolean | Promise<boolean>;
type GenericPluginCallbackOptions = {
    cwd: string;
    manifest: PackageJsonWithPlugins;
    config: PluginConfiguration;
    isProduction: boolean;
};
export type GenericPluginCallback = (configFilePath: string, options: GenericPluginCallbackOptions) => Promise<string[]> | string[];
export {};
