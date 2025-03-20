# Test Utilities

This document describes the standardized test utilities available in `__tests__/utils/test-utils.ts`. These utilities make it easier to write consistent, maintainable tests across the application.

## Available Utilities

### Custom Render

The `customRender` function wraps React Testing Library's render function with the necessary providers.

```tsx
import { customRender, screen } from '@/test-utils';

// Renders component with CursorProvider
customRender(<YourComponent />);

// With custom cursor state
customRender(<YourComponent />, {
  mockCursorText: 'VIEW',
  mockCursorPosition: { x: 100, y: 200 }
});
```

### User Event Setup

The `setupUserEvent` function provides a convenient way to use the userEvent library for user interactions.

```tsx
import { customRender, setupUserEvent, screen } from '@/test-utils';

it('handles button clicks', async () => {
  const user = setupUserEvent();
  customRender(<Button onClick={mockFn}>Click me</Button>);
  
  await user.click(screen.getByRole('button'));
  expect(mockFn).toHaveBeenCalled();
});
```

### Accessibility Testing

The `testAccessibility` function makes it easy to run accessibility tests with jest-axe.

```tsx
import { customRender, testAccessibility } from '@/test-utils';

it('has no accessibility violations', async () => {
  const { container } = customRender(<YourComponent />);
  const results = await testAccessibility(container);
  expect(results).toHaveNoViolations();
});
```

### Responsive Testing

Several utilities are provided for testing responsive behavior:

#### Screen Size Simulation

The `simulateScreenSize` function temporarily changes the window dimensions to test responsive behavior.

```tsx
import { customRender, simulateScreenSize, screen } from '@/test-utils';

it('shows mobile content on small screens', () => {
  customRender(<ResponsiveComponent />);
  
  // Set to mobile dimensions
  const restoreSize = simulateScreenSize('mobile');
  
  expect(screen.getByTestId('mobile-view')).toBeInTheDocument();
  expect(screen.queryByTestId('desktop-view')).not.toBeInTheDocument();
  
  // Restore original dimensions
  restoreSize();
});
```

#### Mock DOMRect for Element Sizes

The `createMockRect` function creates mock DOMRect objects for testing layout calculations.

```tsx
import { createMockRect } from '@/test-utils';

// Mock getBoundingClientRect
element.getBoundingClientRect = jest.fn().mockReturnValue(
  createMockRect('desktop', { x: 100, y: 200 })
);
```

## Available Screen Sizes

The utilities include predefined screen size constants:

- `mobile`: 375×667
- `tablet`: 768×1024
- `desktop`: 1280×800
- `wide`: 1920×1080

```tsx
import { screenSizes, simulateScreenSize } from '@/test-utils';

// Access screen dimensions
const mobileWidth = screenSizes.mobile.width;  // 375

// Set to tablet dimensions
simulateScreenSize('tablet');
```

## Re-exported Testing Library Functions

All React Testing Library functions are re-exported for convenience:

```tsx
import { 
  customRender, 
  screen, 
  fireEvent, 
  waitFor 
} from '@/test-utils';
```

## Best Practices

1. Use `customRender` instead of RTL's render when testing components that need access to context providers
2. Use `setupUserEvent()` for simulating user interactions instead of `fireEvent`
3. Include accessibility tests with `testAccessibility` for UI components
4. Test responsive behavior using `simulateScreenSize` with multiple screen configurations
5. Clean up after tests by restoring original window dimensions 