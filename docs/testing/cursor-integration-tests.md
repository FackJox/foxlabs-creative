# Custom Cursor Integration Tests

This documentation covers the integration testing approach for the custom cursor functionality in the RAW/STUDIO portfolio website.

## Overview

The custom cursor is a key interactive feature of the portfolio website that provides visual feedback to users as they interact with different elements on the page. These tests ensure that the cursor behavior is consistent across different components and interactions.

## Test File

The main test file for cursor integration is located at:
- `__tests__/integration/CursorIntegration.test.tsx`

## Testing Approach

The cursor integration tests use a combination of:

1. **Mock components** - Simplified components that replicate the cursor behavior of real portfolio components
2. **Real cursor implementation** - Tests with the actual `CustomCursor` component and `CursorProvider`
3. **Accessibility testing** - Ensuring proper focus states and keyboard navigation works alongside custom cursor

## Key Test Cases

### Cursor Text Changes on Hover

Tests verify that the cursor displays the appropriate text when hovering over different interactive elements:

- Buttons - Display "CLICK" text
- Project cards - Display "VIEW" text
- Links - Display "VISIT" text
- Containers - Display "EXPLORE" text

### Cursor Text Clearing

Tests ensure that cursor text is properly cleared when:

- Mouse leaves an interactive element
- Moving between different interactive elements
- Navigating away from interactive areas

### Different Element Types

Tests verify that cursor behavior is appropriate for different types of UI elements:

- Buttons and interactive controls
- Cards and content containers
- Links and navigation elements
- Nested interactive elements

### Nested Elements

Tests for proper cursor behavior with nested interactive elements:

- Parent containers with child interactive elements
- Proper override of parent cursor text by child elements
- Returning to appropriate cursor state when moving between elements

### Disabled Elements

Tests for appropriate cursor behavior with disabled elements:

- Buttons in disabled state
- Form elements that aren't currently interactive

### Viewport Responsiveness

Tests ensure cursor behavior is consistent across different viewport sizes:

- Desktop viewport behavior
- Mobile/tablet viewport behavior
- Consistent visual feedback regardless of screen size

### Cursor State Transitions

Tests for smooth transitions between cursor states:

- Proper event handling for mouse enter/leave
- Appropriate opacity transitions
- Consistent position tracking

### Focus States Consistency

Tests ensure that keyboard focus states align with cursor hover states:

- Focus triggers same cursor text as hover
- Blur triggers same cursor text clearing as mouse leave
- Keyboard navigation doesn't interfere with cursor behavior

## Implementation Details

The test file implements these features:

1. **Mock Component Suite** - A collection of simplified components (Button, Card, Link, NestedElements) that mimic real portfolio components
2. **TestApp Component** - A wrapper component that includes all test elements and handles cursor state
3. **RealCursorApp Component** - Tests with the actual cursor implementation
4. **Focus Testing** - Specialized tests for keyboard focus and cursor interactions

## Best Practices

When extending these tests or implementing cursor behavior in new components:

1. Always call `setCursorText('')` in `onMouseLeave` handlers to reset cursor text
2. Use descriptive action verbs for cursor text (VIEW, CLICK, VISIT, etc.)
3. Ensure nested elements properly handle cursor text overrides
4. Maintain accessibility by ensuring focus states match hover states
5. Keep cursor transitions smooth with consistent animation durations

## Related Documentation

- [Animation Integration Tests](./animation-integration-tests.md) - Related to cursor animations
- [Component Tests](./components/) - Individual component tests that include cursor behavior
- [Accessibility Testing](./accessibility-testing.md) - Focus and keyboard navigation testing 