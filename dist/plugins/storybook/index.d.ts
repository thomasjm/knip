import type { IsPluginEnabledCallback, GenericPluginCallback } from '../../types/plugins.js';
export declare const NAME = "Storybook";
export declare const ENABLERS: (string | RegExp)[];
export declare const isEnabled: IsPluginEnabledCallback;
export declare const CONFIG_FILE_PATTERNS: string[];
export declare const ENTRY_FILE_PATTERNS: string[];
export declare const PROJECT_FILE_PATTERNS: string[];
export declare const findDependencies: GenericPluginCallback;
