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
```

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
- `__tests__/fixtures/` - Mock data for tests

For more detailed information about the test structure, see the [Test Structure](./docs/testing/test-structure.md) document.