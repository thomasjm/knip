import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Sentry';
export const ENABLERS = [/^@sentry\//];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = ['sentry.{client,server,edge}.config.{js,ts}'];
