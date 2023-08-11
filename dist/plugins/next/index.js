import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Next.js';
export const ENABLERS = ['next'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = ['next.config.{js,ts,cjs,mjs}'];
export const PRODUCTION_ENTRY_FILE_PATTERNS = [
    '{app,pages}/**/*.{js,jsx,ts,tsx}',
    'src/{app,pages}/**/*.{js,jsx,ts,tsx}',
];
