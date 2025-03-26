/**
 * This file provides the Jest DOM matchers version constant for testing.
 */

export const JEST_DOM_MATCHERS_VERSION = '5.16.5';

// Add a dummy test for Jest to find
if (process.env.NODE_ENV === 'test') {
  describe('Jest DOM JS', () => {
    it('exists', () => {
      expect(true).toBe(true);
    });
  });
} 