# RAW/STUDIO Portfolio Website - Testing Documentation

This documentation provides an overview of the testing strategy and implementation for the RAW/STUDIO portfolio website.

## Recent Updates

The test suite has been updated to fix several issues:

- MSW v2 implementation updated from REST API to HTTP API
- Directory structure created to satisfy test imports
- Form validation testing in ContactPage improved
- All tests now passing successfully

## Table of Contents

1. [Testing Strategy](./testing-strategy.md)
2. [Test Structure](./test-structure.md)
3. [Best Practices](./best-practices.md)
4. [Component Tests](./components/)
   - [Project Components](./components/project-components.md)
   - [Service Components](./components/service-components.md)
   - [Team Components](./components/team-components.md)
   - [Layout Components](./components/layout-components.md)
5. [API Tests](./api-client-tests.md)
6. [Integration Tests](./integration-tests.md)
7. [Troubleshooting Guide](./troubleshooting.md)
8. [Status and Next Steps](./status-next-steps.md)

## Layout Components Testing

The layout components provide the structure and navigation for the entire site. These tests verify:

1. Correct rendering of navigation links
2. Mobile menu functionality 
3. Active states for current page links
4. Dropdown and submenu behavior
5. Logo and branding elements 
6. Responsive behavior
7. Cursor text changes on interaction

For details on layout component testing, see the [Layout Components](./components/layout-components.md) documentation.

## API Client Testing

The API client functions are responsible for fetching data from the backend server. These tests verify:

1. Successful data retrieval from API endpoints
2. Proper handling of network failures
3. Appropriate error handling for bad responses
4. Correct filtering and processing of returned data
5. Type safety and data validation

For details on API client testing, see the [API Tests](./api-client-tests.md) documentation. 