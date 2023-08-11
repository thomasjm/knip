import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Playwright';
export const ENABLERS = ['@playwright/test'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = ['playwright.config.{js,ts}'];
