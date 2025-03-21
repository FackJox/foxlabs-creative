# FoxLabs//Creative Portfolio Website - Test Structure

This document provides details about the structure and organization of tests in the FoxLabs//Creative portfolio website.

## 1. Directory Structure

The tests are organized by component type in the `__tests__` directory:

- `__tests__/core`: Core business components (ProjectCard, ServiceItem, TeamMember, etc.)
- `__tests__/pages`: Page components (WorkPage, AboutPage, etc.)
- `__tests__/integration`: Integration tests for multiple components working together
- `__tests__/ui`: UI component tests
- `__tests__/components/ui`: Common UI components (Button, etc.)
- `__tests__/components/forms`: Form-related components (TextInput, etc.)
- `__tests__/components/layout`: Layout components (Header, Footer, etc.)
- `__tests__/hooks`: Hook tests
- `__tests__/utils`: Utility function tests
- `__tests__/api`: API-related tests
- `__tests__/fixtures`: Mock data for test isolation
- `__tests__/mocks`: Mock implementations of external dependencies

## 2. Test Naming Convention

Test files follow this naming convention:
- `ComponentName.test.tsx`: For component tests
- `util-name.test.ts`: For utility function tests

## 3. Mocking Strategy

- External components are mocked when testing a specific component
- The `useCursor` hook is mocked to test cursor text behavior
- Mock data is used instead of actual data to ensure test isolation

## 4. Edge Case Testing

The test suite includes tests for edge cases such as:

- Components with minimal required fields
- Components with all fields populated
- Components with and without optional features (galleries, etc.)
- Single vs. multiple items in collections
- Long text content in various fields

## 5. Known Test Warnings

When running the tests, you might encounter warnings related to Framer Motion props being passed directly to DOM elements. These warnings are expected and don't affect the test functionality:

```bash
React does not recognize the `whileInView` prop on a DOM element.
React does not recognize the `whileHover` prop on a DOM element.
Received `true` for a non-boolean attribute `fill`.
```

These warnings occur because:

1. In the test environment, Framer Motion components are mocked as regular DOM elements
2. The custom props from Framer Motion are then passed to these DOM elements
3. React warns about unrecognized props on standard DOM elements

The tests still function correctly despite these warnings. If needed, these warnings can be suppressed by enhancing the Framer Motion mock implementation. 