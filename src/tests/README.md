# Testing Utilities for Framer Motion and Radix UI

This directory contains testing utilities specifically designed to help test components that use Framer Motion animations and Radix UI components in the FoxLabs//Creative portfolio website.

## Quick Start

To test a component that uses Framer Motion animations and/or Radix UI components:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YourComponent from '@/components/your-component';
import { renderWithRadix, verifyAnimation } from '@/src/tests/test-utils';

// Use the provided mocks or add component-specific mocks
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('YourComponent', () => {
  it('renders correctly with animations', async () => {
    const { container } = renderWithRadix(<YourComponent />);
    
    // Test your component
    const element = screen.getByTestId('animated-element');
    expect(element).toBeInTheDocument();
    
    // Check animation properties
    verifyAnimation(element, 'animate', { opacity: 1 });
  });
});
```

## Available Utilities

### Framer Motion Testing Utilities

1. **MockAnimatePresence**: A mock implementation of Framer Motion's `AnimatePresence`
2. **createMotionComponent**: Creates a mock for any motion component
3. **verifyAnimation**: Checks if a Framer Motion animation was triggered correctly
4. **testAnimatePresenceToggle**: Tests if `AnimatePresence` correctly handles component mounting/unmounting

### Radix UI Testing Utilities

1. **checkRadixAccessibility**: Checks if a Radix UI component has correct accessibility attributes
2. **testRadixTriggerToggle**: Tests if a Radix UI Trigger toggles its controlled content correctly
3. **renderWithRadix**: Custom render function that includes any providers needed by Radix UI components
4. **createMockRadixPortal**: Creates mocks for Radix Portal components to render content inline
5. **waitForRadixAnimation**: Utility to wait for a Radix animation to complete in tests

### Jest Setup

- **setupJestMocks**: Configures all Jest mocks needed for Framer Motion and Radix UI

## Handling Common Testing Challenges

### 1. Animation Timing Issues

Framer Motion animations can cause testing issues due to timing. Our mocks prevent this by removing actual animations while preserving the component structure:

```tsx
// In your test
jest.mock('framer-motion', () => ({
  motion: {
    div: (props) => <div data-testid="motion-element" {...props} />,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
```

### 2. Radix UI Portals

Radix UI components often use portals which render outside the test container. Our mocks render these inline:

```tsx
// In your test
jest.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }) => <div data-testid="portal-content">{children}</div>,
}));
```

### 3. Testing Animation States

To test if animations are triggered correctly:

```tsx
it('applies animations on hover', async () => {
  render(<AnimatedButton />);
  const button = screen.getByRole('button');
  
  // Hover over button
  await userEvent.hover(button);
  
  // Check if animation was applied
  verifyAnimation(button, 'whileHover', { scale: 1.1 });
});
```

### 4. Testing Radix UI Accessibility

To ensure Radix UI components maintain proper accessibility:

```tsx
it('maintains accessibility attributes', async () => {
  render(<Dialog />);
  const trigger = screen.getByRole('button');
  
  // Check attributes
  checkRadixAccessibility(trigger, { 
    role: 'button',
    expanded: false,
    controls: 'dialog-content'
  });
});
```

### 5. Suppressing Radix UI Console Warnings

Radix UI components often produce console warnings in tests when certain accessibility attributes are missing. To suppress these warnings in your tests, you can:

```tsx
// In your test file or setup
const originalConsoleWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    // Filter out specific Radix UI warnings
    if (args[0]?.includes && args[0].includes('Missing `Description`')) {
      return;
    }
    originalConsoleWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalConsoleWarn;
});
```

Alternatively, provide all required accessibility props in your test components:

```tsx
// When testing Radix UI Dialog components
<DialogContent aria-describedby="dialog-description">
  <p id="dialog-description">This description fixes the warning</p>
  {/* Component content */}
</DialogContent>
```

## Best Practices

1. **Data Attributes**: Add `data-testid` attributes to animated elements for easier testing
2. **Isolate Animation Logic**: Use custom hooks for complex animations to test them separately
3. **Test Functionality First**: Focus on testing component behavior rather than animation details
4. **Mock At the Right Level**: Mock at the component level when possible rather than globally
5. **Accessibility**: Always test that animations don't interfere with accessibility features 