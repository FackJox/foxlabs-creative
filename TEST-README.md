# RAW/STUDIO Portfolio - Test Documentation

This document provides information about the test suite for the RAW/STUDIO portfolio website, focusing on the data utility functions and API functionality.

## Data Utility Functions

The portfolio uses several utility functions to manipulate, filter, and validate data. These utility functions are stored in `lib/utils.ts`, `src/utils/apiUtils.ts`, and `src/utils/dataFormatters.ts`.

### Core Data Utilities (`lib/utils.ts`)

These utilities handle data transformation and validation:

| Function | Description | Test File |
|----------|-------------|-----------|
| `filterProjectsByCategory` | Filters projects by category (case-insensitive) | `__tests__/utils/dataUtils.test.ts` |
| `findServiceByTitle` | Finds a service by its title (case-insensitive) | `__tests__/utils/dataUtils.test.ts` |
| `getAllCategories` | Returns all unique project categories | `__tests__/utils/dataUtils.test.ts` |
| `getAllProjectServices` | Returns all unique services mentioned in projects | `__tests__/utils/dataUtils.test.ts` |
| `isValidProject` | Type guard for validating Project objects | `__tests__/utils/dataUtils.test.ts` |
| `isValidService` | Type guard for validating Service objects | `__tests__/utils/dataUtils.test.ts` |
| `isValidTeamMember` | Type guard for validating TeamMember objects | `__tests__/utils/dataUtils.test.ts` |
| `formatProjectData` | Transforms project data for display purposes | `__tests__/utils/dataUtils.test.ts` |

### API Utilities (`src/utils/apiUtils.ts`)

These utilities support API interactions:

| Function | Description | Test File |
|----------|-------------|-----------|
| `encodeParam` | Properly encodes URL parameters for API requests | `__tests__/api/clientUtils.test.ts` |
| `getProjectById` | Finds a project by its ID | `__tests__/api/clientUtils.test.ts` |
| `filterProjectsByCategory` | Filters projects by category | `__tests__/api/clientUtils.test.ts` |
| `getServiceByTitle` | Finds a service by its title | `__tests__/api/clientUtils.test.ts` |

### Data Formatters (`src/utils/dataFormatters.ts`)

These utilities handle more complex data transformations:

| Function | Description | Test File |
|----------|-------------|-----------|
| `formatProjectsForListing` | Formats projects for display in listings | `__tests__/utils/dataFormatters.test.ts` |
| `enhanceProjectWithServiceDetails` | Adds service details to projects | `__tests__/utils/dataFormatters.test.ts` |
| `createDescriptionExcerpt` | Creates excerpts from long descriptions | `__tests__/utils/dataFormatters.test.ts` |

## Test Structure

The tests are organized into several files:

- **`__tests__/utils/dataUtils.test.ts`**: Tests for core data utility functions
- **`__tests__/api/clientUtils.test.ts`**: Tests for API utility functions
- **`__tests__/utils/dataFormatters.test.ts`**: Tests for data formatting functions
- **`__tests__/api/client.test.ts`**: Tests for the API client functions (with mocked fetch)

## Test Fixtures

Mock data for testing is provided in:

- **`__tests__/fixtures/mockData.ts`**: Contains mock projects, services, and team members

## Test Coverage

The tests cover the following aspects:

1. **Basic Functionality**: Tests that functions return expected results for valid inputs
2. **Edge Cases**: Tests behavior with empty arrays, missing fields, and invalid data
3. **Case Sensitivity**: Ensures functions handle case-insensitive matching correctly
4. **Type Validation**: Tests type guards for proper validation of data structures
5. **Data Transformations**: Tests that data is correctly formatted for different contexts

## Running the Tests

To run the test suite:

```bash
npm test
```

To run tests for a specific file:

```bash
npm test -- __tests__/utils/dataUtils.test.ts
```

## Test Design Principles

The tests follow these principles:

1. **Isolation**: Each test focuses on a single functionality
2. **Independence**: Tests do not depend on other tests
3. **Comprehensiveness**: Covers both normal and edge cases
4. **Readability**: Test descriptions clearly explain what is being tested

## Adding New Tests

When adding new data utility functions:

1. Add the function to the appropriate utility file
2. Create tests in the corresponding test file
3. Ensure all edge cases are covered
4. Update this documentation 

## Custom React Hooks Testing

The portfolio uses several custom React hooks to manage state and interactions. These hooks are tested using the `renderHook` function from `@testing-library/react`.

### Hook Test Structure

Tests for custom hooks are located in `__tests__/hooks/` and follow these patterns:

1. **Initial State**: Test that hooks provide expected initial values
2. **State Updates**: Test that hooks correctly update their state
3. **Side Effects**: Test any side effects (like event listeners)
4. **Cleanup**: Test that hooks properly clean up resources on unmount

### Tested Hooks

| Hook | Description | Test File |
|------|-------------|-----------|
| `useCursor` | Manages cursor position and text for custom cursor interactions | `__tests__/hooks/use-cursor.test.tsx` |
| `useIsMobile` | Detects if the viewport is mobile-sized | `__tests__/hooks/use-mobile.test.tsx` |
| `useToast` | Manages toast notifications | `__tests__/hooks/use-toast.test.tsx` |

### Testing Patterns

#### Wrapping Context Providers

Some hooks rely on React context and need to be wrapped in their provider:

```tsx
const wrapper = ({ children }) => (
  <CursorProvider>{children}</CursorProvider>
);

const { result } = renderHook(() => useCursor(), { wrapper });
```

#### Testing Browser APIs

For hooks that interact with browser APIs, we mock the relevant APIs:

```tsx
// Mock window properties
window.matchMedia = jest.fn().mockImplementation(/* implementation */);
Object.defineProperty(window, 'innerWidth', { value: 767 });
```

#### Testing Effects and Cleanup

Hooks that set up and clean up effects are tested by checking if they properly add and remove event listeners:

```tsx
// Verify event listener is added
expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));

// Unmount to trigger cleanup
const { unmount } = renderHook(() => useHook());
unmount();

// Verify event listener is removed
expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
```

### Running Hook Tests

To run tests for all hooks:

```bash
npm test -- __tests__/hooks
```

To run tests for a specific hook:

```bash
npm test -- __tests__/hooks/use-cursor.test.tsx
```

## UI Component Tests

The portfolio website includes comprehensive tests for UI components to ensure they render correctly, handle events properly, and maintain accessibility standards.

### Component Test Structure

Tests for UI components are located in `__tests__/ui/` and follow these patterns:

1. **Rendering Tests**: Verify components render correctly with various props and children
2. **Variant Tests**: Check that style variants apply the correct classes
3. **Event Handling**: Verify click handlers, hover states, and other interactions
4. **Accessibility**: Ensure components have proper ARIA attributes and roles
5. **Custom Class Support**: Verify custom classes can be applied and don't conflict

### Tested Components

| Component | Description | Test File |
|-----------|-------------|-----------|
| `Button` | Base button component with multiple variants | `__tests__/ui/Button.test.tsx` |
| `Card` | Container card with header, body, footer | `__tests__/ui/Card.test.tsx` |
| `Badge` | Small status indicator with multiple variants | `__tests__/ui/Badge.test.tsx` |
| `SplitText` | Animated typography component for text effects | `__tests__/ui/SplitText.test.tsx` |

### Custom Cursor Behavior

The portfolio implements a custom cursor that changes text based on the hovered element. Tests in `__tests__/ui/CursorBehavior.test.tsx` verify:

1. Components correctly call `setCursorText` on mouse enter/leave
2. Cursor text is appropriate for the component's purpose
3. Nested components handle cursor changes correctly
4. Multiple hover/leave events are handled properly

### Testing Framer Motion Components

Components that use Framer Motion for animations require special handling in tests:

```tsx
// Example mock for Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => (
      <div data-testid="motion-div" data-motion-props={JSON.stringify(props)}>
        {children}
      </div>
    ),
    // Other motion components...
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
```

This approach allows testing of:
- Animation variants and properties
- Initial and animate states
- Animation timing and delays

### Testing Challenges with Framer Motion

When testing components that use Framer Motion, we encountered specific challenges that required custom solutions:

#### JSON Serialization Limitations

Framer Motion uses function props (like `variants.visible`) that can't be directly serialized with `JSON.stringify` in our mocks. For the `SplitText` component, we addressed this by:

1. Using `data-motion-props` to serialize the props passed to motion components
2. Adjusting tests to handle stringified functions by checking for their existence rather than their actual functionality
3. Testing function properties indirectly through their effects on the rendered component

```tsx
// Example solution for testing stringified functions
const containerProps = JSON.parse(container.getAttribute('data-motion-props') || '{}');

// Instead of:
expect(typeof containerProps.variants.visible).toBe('function');

// We use:
expect(containerProps.variants).toEqual(expect.objectContaining({
  hidden: expect.objectContaining({ opacity: 0 })
}));
```

#### Testing Delay Props

For props like `delay` that affect function variants, we test that the component renders correctly with the prop rather than testing the function behavior directly:

```tsx
// We verify the component renders with the delay parameter
expect(screen.getByTestId('motion-div')).toBeInTheDocument();

// And check that child elements render correctly
const spans = screen.getAllByTestId('motion-span');
expect(spans.length).toBeGreaterThan(0);
```

#### Empty String Handling

Special attention was needed for edge cases like empty input strings:

```tsx
// When text is empty, we still expect the container to render
const container = screen.getByTestId('motion-div');
expect(container).toBeInTheDocument();

// We verify there are no visible text nodes
expect(container.textContent).toBe('');
```

### Testing Radix UI Components

Components that use Radix UI primitives require testing for:
- Proper accessibility attributes
- Correct state changes (open/closed, etc.)
- Event handling
- Portal rendering

### Accessibility Testing

Accessibility tests in `__tests__/ui/AccessibilityTests.test.tsx` verify that all UI components meet accessibility standards:

1. **Automated Testing with jest-axe**: Detects common accessibility issues
2. **Keyboard Navigation**: Ensures components can be used with keyboard-only navigation
3. **ARIA Attributes**: Verifies proper use of ARIA roles, states, and properties
4. **Focus Management**: Tests that focus order is logical and focus styles are visible

Example accessibility test using jest-axe:

```tsx
it('Button component has no accessibility violations', async () => {
  const { container } = render(
    <Button aria-label="Accessible button">
      Click me
    </Button>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Keyboard navigation tests ensure that components can be used without a mouse:

```tsx
it('Button is keyboard navigable and activates with keyboard', async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();
  
  render(<Button onClick={handleClick}>Keyboard Button</Button>);
  
  const button = screen.getByRole('button', { name: 'Keyboard Button' });
  
  // Focus the button
  button.focus();
  expect(button).toHaveFocus();
  
  // Activate with Enter key
  await user.keyboard('{Enter}');
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Running UI Component Tests

To run tests for all UI components:

```bash
npm test -- __tests__/ui
```

To run tests for a specific component:

```bash
npm test -- __tests__/ui/Button.test.tsx
```

## Test Coverage Requirements

UI components should maintain at least 85% test coverage, with particular emphasis on:
- All component variants being tested
- Accessibility features
- Event handlers
- Responsive behavior where applicable 