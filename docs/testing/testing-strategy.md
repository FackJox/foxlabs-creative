# RAW/STUDIO Portfolio Website - Testing Strategy

This document outlines the overall testing strategy for the RAW/STUDIO portfolio website.

## 1. Testing Approach

The testing strategy follows a comprehensive approach with multiple layers:

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user flows using Cypress

## 2. Testing Libraries

- **Jest**: The main test runner
- **React Testing Library**: For testing React components
- **user-event**: For simulating user interactions
- **jest-axe**: For accessibility testing
- **Cypress**: For end-to-end testing

## 3. Test Run Instructions

To run the tests, use the following commands:

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
```

## 4. Test Coverage Targets

The test coverage targets for this project are:

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

Current coverage status (as of last test run):
- Statements: 41.78% (target: 80%)
- Branches: 17.87% (target: 80%)
- Lines: 47.12% (target: 80%)
- Functions: 23.15% (target: 80%)

Coverage reports are generated at `coverage/jest` after running `npm run test:coverage`.

## 5. Continuous Integration

Tests are automatically run in CI/CD pipeline on each push to ensure code quality. The following steps occur:

1. Lint check
2. Unit tests
3. E2E tests in headless mode
4. Coverage report generation
5. Deployment on test success

## 6. Accessibility Testing

Accessibility testing is implemented using jest-axe to ensure components meet WCAG 2.1 AA standards. All components are tested for accessibility violations.

## 7. Test Maintenance

When adding new features or modifying existing components:

1. Update mockData in `__tests__/fixtures/mockData.ts` if needed
2. Create new test files for new components
3. Update existing tests for modified components
4. Ensure test coverage remains above targets 