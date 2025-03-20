# RAW/STUDIO Portfolio Website Test Documentation

This is the index of test documentation for the RAW/STUDIO portfolio website. It provides an overview of the testing structure and links to detailed test documentation for specific components and features.

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
- [Keyboard Navigation Tests](./testing/accessibility/keyboard-navigation.md)

## 6. Test Utilities

Documentation for test utilities and helpers:

- [Testing Utilities](./testing/utilities/testing-utilities.md)
- [Mock Data](./testing/utilities/mock-data.md)
- [Mock Data Factory](./testing/utilities/mock-data-factory.md)
- [Test Fixtures](./testing/utilities/test-fixtures.md)
- [Form Validation](./testing/validation-tests.md) - Documentation for form validation utility tests

## 7. Recently Updated Test Documentation

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
  - Integration with RAW/STUDIO's brutalist form components
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

State updates are wrapped in `act()` specifically when:

1. Calling the `refetch()` function:
   ```typescript
   await act(async () => {
     result.current.refetch();
   });
   ```

2. Rerendering hooks with new props:
   ```typescript
   await act(async () => {
     rerender('Branding');
   });
   ```

This approach ensures that all state updates are properly flushed and processed before test assertions are made.

### Additional Test Cases

- **Parameter Changes**: 
  - Tests that the hook refetches data when key parameters change
  - For example, changing project ID or service title

- **Sorting and Filtering**:
  - Tests that sorting works correctly for the services hook
  - Tests that category filtering works for the projects hook

## Form Validation

The project uses a comprehensive form validation system for client-side form validation. The validation utilities are defined in `lib/utils/validation.ts` and their tests in `__tests__/utils/validation.test.ts`.

### Validation Overview

- **Modular Design**: Individual validation functions that can be combined for complex rules
- **Comprehensive Validation Types**: Support for required fields, email format, length constraints, value matching, and custom rules
- **Detailed Error Reporting**: Each validation error includes a type and customizable message
- **Form-Level Validation**: Functions to validate entire forms with different rules for each field
- **Error Collection**: The system collects all validation errors, not just the first encountered

### Test Coverage

The validation tests achieve 100% code coverage and include:

1. **Individual Validation Functions**:
   - `validateRequired`: Ensures fields have non-empty values
   - `validateEmail`: Verifies email format using robust pattern matching
   - `validateLength`: Checks string length against minimum and maximum constraints
   - `validateMatch`: Compares values for equality (e.g., password confirmation)
   - `validateCustom`: Applies arbitrary validation rules via custom functions

2. **Validation Combiners**:
   - `combineValidationResults`: Merges multiple validation results
   - `validateField`: Applies multiple validations to a single field
   - `validateForm`: Validates entire forms with different rules per field

3. **Real-world Scenarios**:
   - Contact form validation with required fields and format checking
   - Registration form with complex password rules and confirmation

### Integration with RAW/STUDIO Components

The validation system integrates with RAW/STUDIO's brutalist form components to provide:
- Immediate validation feedback
- Clear error presentation aligned with brutalist design principles
- Integration with the custom cursor system for interactive feedback

See [Form Validation Tests](./testing/validation-tests.md) for detailed documentation.

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- __tests__/utils/validation.test.ts
```

## Mock Data

Tests use mock data from `__tests__/fixtures/mockData.ts` and mock API handlers from `__tests__/mocks/handlers.ts` to simulate API responses without making actual network requests.

## Testing Setup

The tests use:

- Jest as the test runner
- React Testing Library's `renderHook` function to test hooks
- MSW (Mock Service Worker) for mocking API requests 