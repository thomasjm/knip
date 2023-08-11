import type { IsPluginEnabledCallback, GenericPluginCallback } from '../../types/plugins.js';
export declare const NAME = "GitHub Actions";
export declare const ENABLERS = "This plugin is enabled when a `.yml` file is found in the `.github/workflows` folder.";
export declare const isEnabled: IsPluginEnabledCallback;
export declare const CONFIG_FILE_PATTERNS: string[];
export declare const findDependencies: GenericPluginCallback;
