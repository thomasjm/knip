import type { BabelConfigObj } from './types.js';
import type { IsPluginEnabledCallback, GenericPluginCallback } from '../../types/plugins.js';
export declare const NAME = "Babel";
export declare const ENABLERS: RegExp[];
export declare const isEnabled: IsPluginEnabledCallback;
export declare const CONFIG_FILE_PATTERNS: string[];
export declare const getDependenciesFromConfig: (config: BabelConfigObj) => string[];
export declare const findDependencies: GenericPluginCallback;
