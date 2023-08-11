import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Vite';
export const ENABLERS = ['vite'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = ['vite.config.{js,ts}'];
