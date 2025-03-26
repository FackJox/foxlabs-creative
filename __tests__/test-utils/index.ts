/**
 * Entry point for test utilities
 */
export * from './setup-jest-mocks'
export * from './radix-ui-mocks'
export * from './framer-motion-mocks'

// Re-export from third party libraries for convenience
export { render, screen, waitFor } from '@testing-library/react'

// Add a dummy test for Jest to find
if (process.env.NODE_ENV === 'test') {
  describe('Test Utils', () => {
    it('exists', () => {
      expect(true).toBe(true);
    });
  });
} 