import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('Basic Accessibility Tests', () => {
  it('passes for a simple, accessible element', async () => {
    const { container } = render(
      <button aria-label="Close">X</button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 