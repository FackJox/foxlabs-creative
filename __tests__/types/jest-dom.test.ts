import { JEST_DOM_MATCHERS_VERSION } from './jest-dom';

describe('jest-dom type declarations', () => {
  it('exports JEST_DOM_MATCHERS_VERSION constant', () => {
    expect(JEST_DOM_MATCHERS_VERSION).toBe('5.16.5');
  });
}); 