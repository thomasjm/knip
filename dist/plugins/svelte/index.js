import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Svelte';
export const ENABLERS = ['svelte'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = ['svelte.config.js', 'vite.config.ts'];
export const PRODUCTION_ENTRY_FILE_PATTERNS = [
    'src/routes/**/+{page,server,page.server,error,layout,layout.server}{,@*}.{js,ts,svelte}',
];
export const PROJECT_FILE_PATTERNS = ['src/**/*.{js,ts,svelte}'];
