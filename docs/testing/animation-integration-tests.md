# Animation Integration Tests

This document describes the integration tests for animations and transitions in the RAW/STUDIO portfolio website.

## Overview

The animation integration tests verify that Framer Motion animations work correctly in component interactions. These tests ensure that:

1. Animations are triggered by the correct events
2. AnimatePresence correctly handles elements entering and exiting
3. Animation variants for different states work as expected
4. Reduced motion preferences are respected
5. Animations don't interfere with functionality
6. Animations work consistently across different browsers

## Test Structure

Animation tests are organized in the following files, each focusing on a specific aspect of animation:

- `PageTransitions.test.tsx` - Tests page transition animations
- `ModalAnimations.test.tsx` - Tests modal open/close animations
- `ListAnimations.test.tsx` - Tests staggered list entrance animations
- `InteractionAnimations.test.tsx` - Tests hover and interaction animations
- `CrossBrowserAnimations.test.tsx` - Tests animation compatibility across browsers
- `ReducedMotion.test.tsx` - Tests reduced motion preference handling

## Animation Accessibility (Reduced Motion)

The RAW/STUDIO portfolio respects user preferences for reduced motion to ensure accessibility for users who experience motion sickness, vestibular disorders, or other conditions triggered by animation.

### Implemented Accessibility Features

1. **useReducedMotion Hook**: All animated components utilize Framer Motion's `useReducedMotion` hook to detect the user's motion preference setting
2. **Alternative Animation Strategies**: Components provide alternative, minimal animations when reduced motion is preferred
3. **Critical State Changes**: Essential UI state changes remain visible even with reduced motion enabled
4. **Animation Duration Reduction**: Shorter animation durations are used when reduced motion is preferred
5. **Transform Elimination**: Animations avoid scale, position, and rotation transforms when reduced motion is preferred, focusing only on opacity changes

### Reduced Motion Tests

The `ReducedMotion.test.tsx` file contains tests that verify animations respect the user's motion preferences:

1. **Full Animation Test**: Verifies components use standard animations when reduced motion is not preferred
2. **Minimal Animation Test**: Checks that animations are simplified when reduced motion is preferred
3. **Essential UI Changes Test**: Ensures critical state changes (like modal visibility) still occur with reduced motion
4. **Page Transition Test**: Verifies that page transitions use simplified animations with reduced motion
5. **System Preference Test**: Confirms that the system preference for reduced motion is correctly detected and applied

### List Animation Accessibility

The `ListAnimations.test.tsx` file includes tests specifically for list animations and reduced motion:

1. **Staggered Animation Test**: Verifies staggered delays are applied to list items
2. **Reduced Motion List Test**: Ensures staggered delays are removed when reduced motion is preferred
3. **Transform Animation Test**: Verifies position animations are disabled with reduced motion
4. **Exit Animation Test**: Checks that exit animations are simplified with reduced motion

## Testing Approaches

### 1. Animation Property Testing

We test that components have the correct animation properties configured, including:

- Initial states
- Animate states
- Exit animations
- Transition properties (duration, delay, easing)
- Variants

Example:
```tsx
it('renders with correct animation properties', () => {
  render(<AnimatedComponent />);
  
  const element = screen.getByTestId('motion-div');
  const props = JSON.parse(element.getAttribute('data-motion-props') || '{}');
  
  expect(props).toMatchObject({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  });
});
```

### 2. Staggered Animation Testing

For list animations, we verify that items animate with the correct staggered timing:

```tsx
it('staggers animations correctly', () => {
  render(<StaggeredList items={['Item 1', 'Item 2', 'Item 3']} />);
  
  const items = screen.getAllByTestId('motion-li');
  
  items.forEach((item, index) => {
    const props = JSON.parse(item.getAttribute('data-motion-props') || '{}');
    expect(props.transition.delay).toBe(index * 0.1);
  });
});
```

### 3. Interaction Testing

We test animations triggered by user interactions:

```tsx
it('applies hover animations', async () => {
  const user = userEvent.setup();
  
  render(<AnimatedButton />);
  const button = screen.getByTestId('motion-button');
  
  await user.hover(button);
  
  const props = JSON.parse(button.getAttribute('data-motion-props') || '{}');
  expect(props.whileHover).toBeDefined();
});
```

### 4. AnimatePresence Testing

We test that AnimatePresence correctly handles elements entering and exiting:

```tsx
it('handles exit animations', async () => {
  const { rerender } = render(<AnimatedComponent isVisible={true} />);
  
  rerender(<AnimatedComponent isVisible={false} />);
  
  const element = screen.getByTestId('motion-div');
  const props = JSON.parse(element.getAttribute('data-motion-props') || '{}');
  expect(props.exit).toBeDefined();
});
```

### 5. Reduced Motion Testing

We test that animations respect the user's reduced motion preference:

```tsx
it('respects reduced motion preference', () => {
  require('framer-motion').useReducedMotion.mockReturnValue(true);
  
  render(<ReducedMotionAwareComponent />);
  
  const element = screen.getByTestId('motion-div');
  const props = JSON.parse(element.getAttribute('data-motion-props') || '{}');
  
  // Should use simpler animations with reduced motion
  expect(props.animate.scale).toBeUndefined();
  expect(props.transition.duration).toBeLessThan(0.2);
});
```

### 6. Cross-Browser Testing

We test that animations are compatible across different browsers:

```tsx
it('works in different browsers', () => {
  // Test in Chrome
  require('@/lib/utils/browser-detection').detectBrowser.mockReturnValue('chrome');
  render(<CrossBrowserComponent />);
  
  // Test in Firefox
  require('@/lib/utils/browser-detection').detectBrowser.mockReturnValue('firefox');
  render(<CrossBrowserComponent />);
  
  // Animations should be consistent across browsers
  expect(/* animation properties */).toBeConsistent();
});
```

## Animation Test Mocking Implementation

All animation tests use mock implementations of Framer Motion components to capture animation properties without actually executing the animations. This approach allows for fast, reliable tests while still verifying animation logic.

### Standard Motion Component Mock

```tsx
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => (
      <div 
        data-testid="motion-div" 
        data-motion-props={JSON.stringify({
          initial: props.initial,
          animate: props.animate,
          exit: props.exit,
          transition: props.transition,
          variants: props.variants, // Important for variant-based animations
        })}
        {...props}
      >
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useReducedMotion: jest.fn(() => false),
}));
```

### Enhanced Mock for Capturing Variants

For tests involving animation variants, our mock captures and exposes variant objects for verification:

```tsx
jest.mock('framer-motion', () => {
  const useReducedMotionMock = jest.fn(() => false);
  
  return {
    __esModule: true,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <div
          data-testid="motion-div"
          data-motion-props={JSON.stringify({
            initial: props.initial,
            animate: props.animate,
            transition: props.transition,
            variants: props.variants, // Capturing variants for verification
          })}
          {...props}
        >
          {children}
        </div>
      ),
    },
    useReducedMotion: useReducedMotionMock,
    AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
  };
});
```

## Running Tests

Run the animation integration tests with:

```bash
# Run all animation tests
npm test -- animations

# Run specific animation test files
npm test -- PageTransitions
npm test -- ModalAnimations
npm test -- ListAnimations
npm test -- InteractionAnimations
npm test -- CrossBrowserAnimations
npm test -- ReducedMotion
```

## Recent Updates and Fixes

### Fixed Issues in Animation Tests (July 2024)

1. **ReducedMotion Tests**:
   - Fixed mock implementation to correctly capture and expose variant objects for page transition tests
   - Added `variants` property to the `data-motion-props` JSON string to ensure variant objects can be properly inspected
   - Resolved failure in the "handles page transitions with reduced motion preference" test
   - Ensured proper testing of variant-based animations with reduced motion preferences

2. **ListAnimations Tests**:
   - Updated the `useReducedMotion` mock to properly verify animation behavior
   - Added more comprehensive testing for staggered animations with reduced motion preferences
   - Verified that staggered delays are properly removed and transform animations are disabled when reduced motion is preferred

### Test Coverage Summary

All 28 animation tests across 6 test files are now passing:
- `ReducedMotion.test.tsx`: 5 tests
- `ListAnimations.test.tsx`: 4 tests
- `ModalAnimations.test.tsx`: 5 tests
- `PageTransitions.test.tsx`: 4 tests
- `CrossBrowserAnimations.test.tsx`: 6 tests
- `InteractionAnimations.test.tsx`: 4 tests

## Limitations and Future Work

While the current tests provide good coverage of animation behavior, there are some limitations:

1. These tests verify animation configuration, not the actual animation execution
2. Visual aspects of animations (smoothness, visual appearance) require manual testing or visual regression tests
3. Some browser-specific behaviors may require additional manual testing
4. Further work is needed to test animations triggered by routing and page navigation

Future improvements should include:
1. Visual regression testing for animations
2. End-to-end tests that verify animations in actual browser environments
3. Performance testing for animation impact on page performance 