import type { IsPluginEnabledCallback, GenericPluginCallback } from '../../types/plugins.js';
export declare const NAME = "Nx";
export declare const ENABLERS: (string | RegExp)[];
export declare const isEnabled: IsPluginEnabledCallback;
export declare const CONFIG_FILE_PATTERNS: string[];
export declare const findDependencies: GenericPluginCallback;
