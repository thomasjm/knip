import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Tailwind';
export const ENABLERS = ['tailwindcss'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const CONFIG_FILE_PATTERNS = ['tailwind.config.{js,cjs,mjs,ts}'];
