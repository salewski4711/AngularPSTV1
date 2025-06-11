/**
 * ESLint Plugin für Design Token Enforcement
 * Blockiert hardcodierte Werte und erzwingt Token-Usage
 */

module.exports = {
  rules: {
    'no-hardcoded-colors': require('./rules/no-hardcoded-colors'),
    'no-hardcoded-spacing': require('./rules/no-hardcoded-spacing'),
    'no-tailwind-colors': require('./rules/no-tailwind-colors'),
    'use-token-utils': require('./rules/use-token-utils')
  },
  configs: {
    recommended: {
      plugins: ['design-tokens'],
      rules: {
        'design-tokens/no-hardcoded-colors': 'error',
        'design-tokens/no-hardcoded-spacing': 'error',
        'design-tokens/no-tailwind-colors': 'error',
        'design-tokens/use-token-utils': 'error'
      }
    }
  }
};