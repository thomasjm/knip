import type { VitestConfig } from './types.js';
type BuiltinEnvironment = 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime';
type VitestEnvironment = BuiltinEnvironment | (string & Record<never, never>);
export declare const getEnvPackageName: (env: VitestEnvironment) => any;
export declare const getExternalReporters: (reporters?: VitestConfig['test']['reporters']) => unknown[];
export {};
