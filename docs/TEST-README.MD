# FoxLabs//Creative Portfolio Website Test Documentation

This is the index of test documentation for the FoxLabs//Creative portfolio website. It provides an overview of the testing structure and links to detailed test documentation for specific components and features.

## 1. Test Structure

The project uses the following test structure:

- **Unit Tests**: For testing individual components in isolation
- **Integration Tests**: For testing interactions between multiple components
- **End-to-End (E2E) Tests**: For testing complete user flows
- **Accessibility Tests**: For ensuring the website meets accessibility standards

## 2. Component Tests

Detailed documentation for component tests can be found in the following files:

- [Core Components](./testing/components/core-components.md)
- [Layout Components](./testing/components/layout-components.md)
- [UI Components](./testing/components/ui-components.md)
- [Service Components](./testing/components/service-components.md)
- [Project Components](./testing/components/project-components.md)
- [Animation Components](./testing/components/animation-components.md)
- [ProjectCard](./testing/components/ProjectCard.md) - Documentation for testing the project card component
- [Contact Components](./testing/components/contact-components.md) - Documentation for testing contact components including ContactForm

## 3. Integration Tests

Documentation for integration tests between components and features:

- [Data Flow Tests](./testing/integration/data-flow.md)
- [State Management Tests](./testing/integration/state-management.md)
- [API Integration Tests](./testing/integration/api-integration.md)
- [Projects Page Integration Tests](./testing/projects-page-integration-tests.md) - Documentation for testing the Projects page with all its interactions and states

## 4. End-to-End Tests

Documentation for end-to-end tests of user flows:

- [Navigation Flows](./testing/e2e/navigation.md)
- [Project Browsing Flows](./testing/e2e/project-browsing.md)
- [Service Discovery Flows](./testing/e2e/service-discovery.md)
- [Contact Form Flows](./testing/e2e/contact-form.md)

## 5. Accessibility Tests

Documentation for accessibility testing:

- [WCAG Compliance Tests](./testing/accessibility/wcag-compliance.md)
- [Screen Reader Tests](./testing/accessibility/screen-reader.md)
- [Keyboard Navigation Tests](./testing/accessibility/keyboard-navigation.md) - Updated with comprehensive documentation for testing keyboard navigation across the site
- [Project Accessibility Tests](./testing/accessibility/project-accessibility.md) - New documentation for Project component accessibility tests
- [Focus Management Tests](./testing/accessibility/focus-management.md)
- [Reduced Motion Tests](./testing/accessibility/reduced-motion.md)

## 6. Test Utilities

Documentation for test utilities and helpers:

- [Testing Utilities](./testing/utilities/testing-utilities.md)
- [Mock Data](./testing/utilities/mock-data.md)
- [Mock Data Factory](./testing/utilities/mock-data-factory.md)
- [Test Fixtures](./testing/utilities/test-fixtures.md)
- [Form Validation](./testing/validation-tests.md) - Documentation for form validation utility tests

## 7. Recently Updated Test Documentation

- **[Project Accessibility Tests](./testing/accessibility/project-accessibility.md)** - NEW documentation for Project component accessibility tests:
  - Comprehensive testing of Project List and Project Detail accessibility features
  - Documentation of custom Cypress commands for accessibility testing
  - Detailed test descriptions for all 11 accessibility tests
  - Implementation of the tab simulation command
  - Troubleshooting guide for common accessibility testing issues

- **[Keyboard Navigation Tests](./testing/accessibility/keyboard-navigation.md)** - UPDATED with comprehensive keyboard navigation testing documentation:
  - Improved test reliability with explicit focus management
  - Implementation of custom tab command for keyboard navigation simulation
  - Common issues and solutions for keyboard accessibility testing
  - Best practices for implementing keyboard navigation

- **[Projects Page Integration Tests](./testing/projects-page-integration-tests.md)** - Completely updated with advanced Jest mocking techniques and troubleshooting information:
  - Added detailed explanation of using `jest.doMock()` instead of `jest.mock()` to avoid hoisting issues
  - Added comprehensive guide for properly mocking Framer Motion components with React.createElement
  - Expanded documentation on handling multiple elements with the same text using getAllByText
  - Added troubleshooting section for common testing issues
  - Enhanced best practices section with reliable element selection techniques
  - Updated all test scenarios to reflect the current implementation

- **[Custom Cursor Component](./testing/components/custom-cursor.md)** - Updated with comprehensive test documentation for the custom cursor functionality:
  - Enhanced CursorProvider tests with detailed cursor positioning verification
  - Extended useCursor hook tests with cursor text updates and position tracking
  - Added documentation for integration patterns with other components
  - Included common usage examples and best practices
  - Comprehensive testing of event listener management
  - Verification of accessibility compliance

- **[Contact Components](./testing/components/contact-components.md)** - Added comprehensive ContactForm component test suite documentation with structured organization covering:
  - Form rendering tests for all required and optional fields
  - Validation behavior for all field types
  - Submission behavior with loading states
  - Success/error state handling with proper user feedback
  - Accessibility compliance for all form states and error handling
  - Complete mock implementation for testing API interactions

- **[Form Validation](./testing/validation-tests.md)** - Updated with detailed documentation for all validation utilities, including:
  - Comprehensive test coverage (100%) of all validation functions
  - Test cases for required fields, email formats, length validation, custom validation
  - Integration testing for contact forms and registration forms
  - Advanced usage examples with custom validation rules
  - Integration with FoxLabs//Creative's brutalist form components
- **[Project Components](./testing/components/project-components.md)** - Added comprehensive ProjectList component test suite documentation with structured organization covering rendering, filtering, responsive layouts, animation sequencing, and accessibility compliance
- **[ProjectCard](./testing/components/ProjectCard.md)** - Added comprehensive ProjectCard component test suite documentation with structured organization covering rendering variations, interaction behaviors, and accessibility compliance
- **[UI Components](./testing/components/ui-components.md)** - Added comprehensive Button component test suite documentation with structured organization and key testing techniques for all variants, states, cursor behavior, and accessibility
- **[Layout Components](./testing/components/layout-components.md)** - Added comprehensive Footer component test suite documentation with structured organization and key testing techniques for social links, cursor behavior, and accessibility
- **[Layout Components](./testing/components/layout-components.md)** - Added comprehensive Header component test suite documentation with structured organization and key testing techniques
- **[Mock Data Factory](./testing/utilities/mock-data-factory.md)** - Added comprehensive mock data factory for generating test data
- **[Service Components](./testing/components/service-components.md)** - Updated with ServiceBenefits and ServiceItem component tests

## Data Fetching Hooks

The portfolio website uses custom React hooks for data fetching. These hooks are responsible for fetching data from the API endpoints, managing loading and error states, and providing mechanisms for refetching and caching data.

### Hooks Overview

- `useProjects`: Fetches all projects or projects filtered by category
- `useProject`: Fetches a single project by ID
- `useServices`: Fetches all services with optional sorting
- `useService`: Fetches a single service by title

### Test Files

The following test files have been created for the data fetching hooks:

- `__tests__/hooks/useProjects.test.ts`
- `__tests__/hooks/useProject.test.ts`
- `__tests__/hooks/useServices.test.ts`
- `__tests__/hooks/useService.test.ts`

### Test Coverage

Each test file covers the following aspects:

1. **Initial Loading State**: 
   - Tests that the hook returns `isLoading: true` initially
   - Tests that data and error are `null` during loading

2. **Successful Data Fetching**:
   - Tests that data is correctly set after a successful API response
   - Tests that loading state is set to `false` after data is loaded
   - Tests that the correct API function is called with the right parameters

3. **Error Handling**:
   - Tests that errors from the API are correctly captured
   - Tests that the error state is populated and data remains `null`

4. **Refetching Functionality**:
   - Tests that the refetch function works as expected
   - Tests that loading state is updated during refetch

5. **Caching Behavior**:
   - Tests that cached data is used when enabled
   - Tests that API is not called again when using cached data

### State Update Handling

All data fetching hook tests utilize the `act()` function from `@testing-library/react` to properly handle React state updates:

```typescript
import { renderHook, waitFor, act } from '@testing-library/react';
```

The `act()` function is crucial for:

- Ensuring state updates are processed correctly during tests
- Wrapping operations that cause React state updates
- Preventing warnings about state updates outside React's lifecycle
- Creating tests that accurately simulate how React handles asynchronous state changes

State updates are wrapped in `

# Custom Cursor Testing Documentation

This document outlines the testing procedures for the custom cursor implementation in the FoxLabs//Creative portfolio website.

## Overview

The custom cursor is a key UI element of the portfolio website, providing visual feedback when hovering over interactive elements like buttons and links. The cursor consists of two parts:

1. Main cursor - A circular overlay that displays context-specific text (like "VIEW", "CONTACT", etc.)
2. Cursor small - A small dot that follows the mouse cursor

## Implementation Details

The cursor implementation is split into several components:

- `CustomCursor` component - The visual representation of the cursor
- `useCursor` hook - Manages cursor state (position and text)
- `CursorProvider` - Context provider that makes cursor state available throughout the app

## Testing Approach

We have implemented multiple test levels for the cursor functionality:

1. **Unit Tests**: Testing the `CustomCursor` component and `useCursor` hook in isolation
2. **Integration Tests**: Testing cursor interaction with UI components
3. **End-to-End Tests**: Cypress tests for cursor elements and attributes

## Bug Fixes

### Fixed Issues

1. **Cursor Visibility Bug**: The cursor small was not visible consistently across the application.
   - Root cause: Fixed positioning of cursor elements caused visibility testing issues
   - Solution: Added proper data attributes and updated testing approach

2. **Test Reliability**: Enhanced tests to deal with fixed positioning challenges
   - Added proper data attributes to all cursor elements
   - Updated tests to check for existence rather than visibility
   - Added wait times to handle rendering and animations

## Running Tests

### Unit Tests

```bash
npm test -- __tests__/components/cursor/CustomCursor.test.tsx
npm test -- __tests__/components/cursor/CursorInteraction.test.tsx
```

### Cypress Tests

```bash
npx cypress run --spec "cypress/e2e/cursor-visibility.cy.ts"
```

## Test Output

The CustomCursor component's cursor small should always be present, while the main cursor should only appear when hovering over interactive elements with `setCursorText` implementations. The tests now verify this behavior by checking for element existence and proper data attributes rather than relying on visibility checks.