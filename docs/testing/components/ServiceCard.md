# ServiceCard Component Tests

## Overview

The ServiceCard component (implemented as `ServiceItem` in the codebase) is a core UI element that displays service information in a card format. It appears on the Services page and is used for navigating to individual service detail pages.

## Test File

Test file location: `__tests__/components/services/ServiceCard.test.tsx`

## Component Features Tested

The ServiceCard component tests verify the following features:

1. **Rendering with Different Data**
   - Complete service data with all fields
   - Minimal service data with only required fields
   - Proper conditional rendering of description based on the `detailed` prop
   - Dark mode styling application based on the `darkMode` prop

2. **Icon Rendering**
   - ArrowUpRight icon that indicates the card is interactive
   - Icon styling and positioning

3. **Interaction Behavior**
   - Setting cursor text to "VIEW" on mouse enter
   - Clearing cursor text on mouse leave
   - Handling click events appropriately

4. **Animation Behavior**
   - Entrance animations with opacity and x-position
   - Hover effects for title and arrow
   - Group hover animations that coordinate multiple elements

5. **Accessibility**
   - Keyboard navigability
   - Appropriate role attributes and CSS classes for interactive elements

## Test Structure

The test suite is structured with describe blocks for:

```javascript
describe('ServiceCard Component', () => {
  // Common setup with mocked router and cursor
  
  describe('Rendering with different data variations', () => {
    // Tests for rendering with different data configurations
  });

  describe('Icon rendering', () => {
    // Tests for the presence and behavior of the arrow icon
  });

  describe('Interaction behavior', () => {
    // Tests for mouse interactions and cursor text changes
  });

  describe('Animation behavior', () => {
    // Tests for animation attributes and classes
  });

  describe('Accessibility compliance', () => {
    // Tests for keyboard accessibility and ARIA attributes
  });
});
```

## Mock Implementation

The tests use:

1. **Jest Mocks**
   - Mocked `next/navigation` for router functionality
   - Mocked `useCursor` hook to verify cursor behavior

2. **Mock Data Factory**
   - `createMockService()` - For complete service objects
   - `createMinimalService()` - For services with only required fields

## Running the Tests

To run the ServiceCard component tests:

```bash
# Run just the ServiceCard tests
npm test -- __tests__/components/services/ServiceCard.test.tsx

# Run all service component tests
npm test -- --testPathPattern=__tests__/components/services/
```

## Test Coverage Highlights

The test suite achieves full coverage of the ServiceCard component, including:

- **100% statement coverage** - All code paths executed
- **92.85% branch coverage** - Almost all conditional branches tested
- **100% function coverage** - All functions called
- **100% line coverage** - All lines of code executed

## Test Patterns and Best Practices

These tests demonstrate the following testing patterns:

1. **Component isolation** - Testing the component in isolation with mocked dependencies
2. **Data variations** - Testing with different data configurations
3. **Mock factory usage** - Using the mockDataFactory to create consistent test data
4. **Interaction testing** - Verifying behavior on mouse events
5. **Accessibility verification** - Ensuring keyboard navigability

## Related Components

The ServiceCard component tests should be considered alongside tests for:

1. **ServiceList** - Tests for the component that renders multiple ServiceCards
2. **ServiceDetails** - Tests for the detailed view of a service
3. **Custom Cursor Tests** - Integration tests for cursor behavior across components 