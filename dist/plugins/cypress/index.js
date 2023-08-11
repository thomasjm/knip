import { hasDependency } from '../../util/plugin.js';
export const NAME = 'Cypress';
export const ENABLERS = ['cypress'];
export const isEnabled = ({ dependencies }) => hasDependency(dependencies, ENABLERS);
export const ENTRY_FILE_PATTERNS = [
    'cypress.config.{js,ts,mjs,cjs}',
    'cypress/support/e2e.{js,jsx,ts,tsx}',
    'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    'cypress/plugins/index.js',
];
