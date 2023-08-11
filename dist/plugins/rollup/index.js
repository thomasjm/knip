import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Rollup';
export const ENABLERS = ['rollup'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = ['rollup.config.{js,mjs,ts}'];
