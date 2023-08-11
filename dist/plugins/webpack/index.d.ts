import type { IsPluginEnabledCallback, GenericPluginCallback } from '../../types/plugins.js';
export declare const NAME = "Webpack";
export declare const ENABLERS: string[];
export declare const isEnabled: IsPluginEnabledCallback;
export declare const CONFIG_FILE_PATTERNS: string[];
export declare const findDependencies: GenericPluginCallback;
