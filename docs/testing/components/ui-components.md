# UI Components Testing Documentation

This document provides detailed information on the testing strategy and implementation for UI components in the RAW/STUDIO portfolio website.

## Table of Contents

1. [Introduction](#introduction)
2. [Button Component](#button-component)
3. [Testing Approach](#testing-approach)

## Introduction

UI components form the foundation of the RAW/STUDIO portfolio website's interface. These components are designed to be reusable, accessible, and consistent with the brutalist design aesthetic. Testing these components thoroughly ensures that they behave as expected across different states and user interactions.

## Button Component

The Button component is a fundamental UI element used throughout the application. It supports various variants, sizes, states, and can be enhanced with icons.

### Test File Location

- `__tests__/components/ui/Button.test.tsx`

### Test Status

All tests for the Button component are **PASSING**. The component has 90% code coverage.

### Key Test Cases

The Button component test suite is organized into several logical sections:

#### Rendering Different Variants

- **Default Props**: Verifies the button renders correctly with default props.
- **Variant Classes**: Tests all available variants (default, destructive, outline, secondary, ghost, link).
- **Size Classes**: Tests all available sizes (default, sm, lg, icon).
- **Icon Rendering**: Verifies correct rendering of icons within buttons.

#### Button State Behavior

- **Disabled State**: Verifies correct styling and behavior when disabled.

#### Click Handling

- **Click Events**: Verifies onClick handlers are called correctly.
- **Disabled Click Prevention**: Confirms disabled buttons don't trigger click events.

#### Cursor Text Updates

- **Hover Behavior**: Tests cursor text updates on hover and clearing on leave using onMouseEnter and onMouseLeave.
- **Disabled Pointer Events**: Confirms disabled buttons have the appropriate pointer-events-none class.

#### Accessibility Compliance

- **WCAG Compliance**: Tests for accessibility violations using axe.
- **Keyboard Accessibility**: Verifies keyboard navigation and operation.
- **ARIA Attributes**: Tests proper ARIA attributes in all states.

#### Composition Features

- **asChild Prop**: Tests rendering as another element using Radix UI's Slot.
- **Custom Classes**: Verifies custom class names are correctly applied.

### Testing Implementation Details

#### Mocks and Setup

The test suite uses several mocks to isolate the Button component:

```tsx
// Create a mock Spinner component directly
jest.mock('@/components/ui/feedback', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>
}));

// Mock cursor hook
const mockSetCursorText = jest.fn();
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: () => ({
    cursorText: '',
    setCursorText: mockSetCursorText
  })
}));
```

#### Key Testing Patterns

1. **Variant Testing**: Using rerender to test multiple variants with the same test.
2. **Event Simulation**: Using userEvent to simulate user interactions.
3. **Accessibility Testing**: Using jest-axe to test for accessibility violations.
4. **Mock Function Verification**: Verifying that mock functions are called correctly.

## Testing Approach

The UI components are tested using the following approach:

1. **Isolation**: Components are tested in isolation to ensure they function correctly regardless of their context.
2. **Variants and States**: All variants and states of a component are tested.
3. **User Interactions**: User interactions like clicking, hovering, and keyboard navigation are tested.
4. **Accessibility**: Components are tested for accessibility compliance.
5. **Edge Cases**: Edge cases like disabled states are tested.

### Test Utilities

The UI component tests leverage several test utilities:

- **Testing Library**: For rendering components and querying the DOM.
- **User Event**: For simulating user interactions.
- **Jest Axe**: For testing accessibility compliance.
- **Custom Renders**: For providing necessary context providers.

### Best Practices

- Each test focuses on a single aspect of the component.
- Tests are organized into logical sections using describe blocks.
- Test descriptions clearly indicate what is being tested.
- Mock implementations are kept simple and focused on the test at hand.
- Accessibility is tested for all components. 