import { compact } from '../../util/array.js';
import { timerify } from '../../util/Performance.js';
import { hasDependency, load } from '../../util/plugin.js';
import { getEnvPackageName, getExternalReporters } from './helpers.js';
export const NAME = 'Vitest';
export const ENABLERS = ['vitest'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['vitest.config.ts'];
export const ENTRY_FILE_PATTERNS = ['vite.config.ts'];
const findVitestDependencies = async (configFilePath) => {
    const config = await load(configFilePath);
    if (!config || !config.test)
        return [];
    const cfg = config.test;
    const environments = cfg.environment ? [getEnvPackageName(cfg.environment)] : [];
    const reporters = getExternalReporters(cfg.reporters);
    const coverage = cfg.coverage ? [`@vitest/coverage-${cfg.coverage.provider ?? 'v8'}`] : [];
    const setupFiles = cfg.setupFiles ? [cfg.setupFiles].flat() : [];
    const globalSetup = cfg.globalSetup ? [cfg.globalSetup].flat() : [];
    return compact([...environments, ...reporters, ...coverage, ...setupFiles, ...globalSetup]);
};
export const findDependencies = timerify(findVitestDependencies);
