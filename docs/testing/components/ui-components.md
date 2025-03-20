# UI Components Testing Documentation

This document provides detailed information on the testing strategy and implementation for UI components in the RAW/STUDIO portfolio website.

## Table of Contents

1. [Introduction](#introduction)
2. [Button Component](#button-component)
3. [TextInput Component](#textinput-component)
4. [Testing Approach](#testing-approach)

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

## TextInput Component

The TextInput component is a form input element that includes a label, optional error messages, helper text, and proper accessibility attributes. It builds upon the basic Input component to provide a more feature-rich input experience.

### Test File Location

- `__tests__/components/forms/TextInput.test.tsx`

### Test Status

All tests for the TextInput component are **PASSING**. The component has 100% code coverage.

### Key Test Cases

The TextInput component test suite is organized into three logical sections:

#### Rendering Behavior

- **Default Props**: Verifies that the input renders correctly with default props.
- **Placeholder Text**: Tests proper display of placeholder text when provided.
- **Initial Value**: Validates that an initial value is correctly displayed.
- **Required Indicator**: Confirms that required fields show an asterisk indicator.
- **Error Messages**: Tests error message display and styling of the input in error state.
- **Disabled State**: Verifies proper styling and attributes in the disabled state.
- **Custom Styling**: Tests that custom class names are correctly applied.

#### User Interaction

- **Value Updates**: Confirms input value updates correctly when a user types.
- **Focus Events**: Tests onFocus handler is called when input is focused.
- **Blur Events**: Tests onBlur handler is called when input loses focus.
- **Disabled Interaction**: Verifies that a disabled input cannot be edited.
- **Cursor Text Updates**: Tests cursor text updates on hover with the cursorText prop.

#### Accessibility Compliance

- **WCAG Compliance**: Tests for accessibility violations using axe.
- **Label Association**: Confirms proper association between label and input using htmlFor and id.
- **Required Attributes**: Tests aria-required is properly applied.
- **Error State Attributes**: Verifies aria-invalid and aria-describedby are properly applied in error state.
- **Keyboard Navigation**: Tests keyboard navigation and interaction.
- **Screen Reader Support**: Verifies proper aria-label support.
- **Helper Text**: Tests helper text is correctly displayed and associated with the input.

### Testing Implementation Details

#### Mocks and Setup

The test suite mocks the cursor hook to isolate the TextInput component:

```tsx
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

1. **User Interaction Testing**: Using userEvent to simulate typing, clicking, and keyboard navigation.
2. **Accessibility Testing**: Using jest-axe to test for accessibility violations.
3. **Conditional Rendering**: Testing the conditional rendering of error messages and helper text.
4. **ARIA Attributes**: Thoroughly testing proper ARIA attributes in all states.
5. **Event Handler Verification**: Verifying that event handlers are called correctly.

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