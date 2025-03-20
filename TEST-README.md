# RAW/STUDIO Portfolio Website - Test Documentation

This document provides an overview of the test documentation for the RAW/STUDIO portfolio website. The documentation has been split into separate files for better organization and maintainability.

## Documentation Structure

The test documentation is organized into the following files:

### 1. Core Testing Documentation

- [Testing Strategy](./docs/testing/testing-strategy.md) - Overview of the testing approach, libraries, and methodology
- [Test Structure](./docs/testing/test-structure.md) - Information about test organization, naming conventions, and mocking strategies
- [Testing Best Practices](./docs/testing/best-practices.md) - Common patterns, approaches, and solutions to common issues
- [Test Status and Next Steps](./docs/testing/status-next-steps.md) - Current coverage status and plans for improvement
- [Integration Tests](./docs/testing/integration-tests.md) - Details on integration testing approach for page components
- [Data Flow Integration Tests](./docs/testing/data-flow-integration-tests.md) - Specialized integration tests focusing on data flow and state management
- [Animation Integration Tests](./docs/testing/animation-integration-tests.md) - Integration tests for animations and transitions using Framer Motion
- [Navigation End-to-End Tests](./docs/testing/navigation-e2e-tests.md) - End-to-end tests verifying navigation flows and user journeys
- [Project End-to-End Tests](./docs/testing/project-e2e-tests.md) - End-to-end tests for project-related user flows and interactions

### 2. Component-Specific Test Documentation

- [Project Component Tests](./docs/testing/components/project-components.md) - Documentation for testing project-related components
- [Service Component Tests](./docs/testing/components/service-components.md) - Documentation for testing service-related components
- [Team Component Tests](./docs/testing/components/team-components.md) - Documentation for testing team-related components

## Quick Reference

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Run E2E tests with Cypress
npm run test:e2e

# Run E2E tests headlessly
npm run test:e2e:headless

# Run all tests (unit + E2E)
npm run test:all

# Run specific Cypress tests
npm run test:e2e -- --spec "cypress/e2e/navigation.cy.ts"
```

### Navigation End-to-End Tests

The navigation end-to-end tests verify key user journeys through the site:

1. Navigation between main pages (Home, Projects/Work, Services)
2. Browser back/forward button functionality
3. URL changes that reflect the current page
4. Basic page content verification

The navigation tests are implemented in four Cypress test files:
- `home.cy.ts` - Tests navigation from the homepage
- `navigation.cy.ts` - Tests core navigation flows between pages
- `projects.cy.ts` - Tests navigation from the projects/work page
- `services.cy.ts` - Tests navigation from the services page

For details, see the [Navigation End-to-End Tests](./docs/testing/navigation-e2e-tests.md) documentation.

### Project End-to-End Tests

The project end-to-end tests verify comprehensive user interactions with the project-related features:

1. Project List View
   - Displaying projects in a grid
   - Filtering projects by category
   - Clearing category filters
   - Project card content verification

2. Project Detail View
   - Navigation to project details
   - Gallery navigation and interactions
   - Testimonial display
   - External project links
   - Back navigation

3. Data Loading and Error States
   - Loading states during data fetching
   - API error handling
   - Non-existent project handling
   - Data validation
   - Optional field handling

4. Accessibility
   - Proper heading hierarchy
   - ARIA labels and landmarks
   - Keyboard navigation
   - Focus management
   - Screen reader announcements
   - Reduced motion support
   - Form control accessibility
   - Error state accessibility

The project tests are implemented in three Cypress test files:
- `project-interactions.cy.ts` - Tests for project list and detail view interactions
- `project-data.cy.ts` - Tests for data loading and error states
- `project-accessibility.cy.ts` - Tests for accessibility features

For details, see the [Project End-to-End Tests](./docs/testing/project-e2e-tests.md) documentation.

### Test Coverage Targets

The test coverage targets for this project are:

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

Current coverage status can be found in the [Test Status and Next Steps](./docs/testing/status-next-steps.md) document.

### Key Test Directories

- `__tests__/core/` - Core business component tests
- `__tests__/pages/` - Page component tests
- `__tests__/integration/` - Integration tests
- `__tests__/integration/animations/` - Animation integration tests
- `__tests__/fixtures/` - Mock data for tests
- `cypress/e2e/` - End-to-end tests with Cypress

For more detailed information about the test structure, see the [Test Structure](./docs/testing/test-structure.md) document.