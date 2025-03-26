## Testing Documentation

This document provides information about the testing setup and guidelines for the FoxLabs//Creative Portfolio website.

### Table of Contents
1. [Test Setup](#test-setup)
2. [Mock Service Worker (MSW)](#mock-service-worker-msw)
3. [Mock Data](#mock-data)
4. [Test Utilities](#test-utilities)
5. [Running Tests](#running-tests)
6. [Writing Tests](#writing-tests)
7. [Testing Conventions](#testing-conventions)
8. [Animation and UI Component Testing](TEST.md) - Specific guidance for testing Framer Motion and Radix UI components

## Test Setup

We use Jest for unit and integration testing. The test setup is configured in the following files:
- `jest.config.js` - Main Jest configuration
- `jest.setup.js` - Setup file that runs before tests
- `jest.polyfill.js` - Polyfills for Jest environment

## Mock Service Worker (MSW)

We use Mock Service Worker (MSW) to intercept API requests during tests. This allows us to test components that make API calls without having to make actual network requests.

The MSW setup is located in:
- `__mocks__/msw/server.ts` - Server setup for Node.js environment
- `__mocks__/msw/browser.ts` - Browser setup for browser environment
- `__mocks__/msw/handlers.ts` - API route handlers for mocking responses

Example usage in tests:

```tsx
import { server } from '@/__mocks__/msw/server'
import { rest } from 'msw'

// Add or override a handler for a specific test
server.use(
  rest.get('/api/test', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true })
    )
  })
)
```

See `__tests__/api/msw.test.tsx` for more examples.

## Mock Data

Mock data for tests is defined in:
- `__mocks__/msw/mockResponse.ts` - Common mock data for API responses
- `__mocks__/msw/simpleMock.ts` - Simple mock objects for unit tests

These files provide typed mock data that matches our data models.

## Test Utilities

We have several test utilities to help with testing:

### Test Setup Utilities
- `__tests__/test-utils/setup-jest-mocks.ts` - Common Jest mocks
- `__tests__/test-utils/radix-ui-mocks.tsx` - Mocks for Radix UI components
- `__tests__/test-utils/framer-motion-mocks.tsx` - Mocks for Framer Motion

### File Mocks
- `__mocks__/fileMock.js` - Mock for file imports
- `__mocks__/styleMock.js` - Mock for style imports

## Running Tests

To run tests, use the following commands:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run a specific test file
npm test -- __tests__/components/Button.test.tsx
```

## Writing Tests

### Component Tests

Component tests should verify that the component renders correctly and behaves as expected when interacted with.

Example:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button'

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

### API Tests

API tests should verify that API client functions make the correct requests and handle responses correctly.

Example:

```tsx
import { fetchProjects } from '@/lib/api/client'
import { mockProjects } from '@/__mocks__/msw/mockResponse'

describe('Project API', () => {
  test('fetchProjects returns all projects', async () => {
    const projects = await fetchProjects()
    expect(projects).toEqual(mockProjects)
  })
})
```

## Testing Conventions

1. **Test Organization**: Keep test files close to the code they test, or in the `__tests__` directory with a matching structure.
2. **Naming Convention**: Name test files with `.test.tsx` or `.test.ts` suffix.
3. **Test Coverage**: Aim for high test coverage, but prioritize critical paths and edge cases.
4. **Mocking**: Use MSW for API mocking, and Jest mocks for other dependencies.
5. **Readability**: Write readable tests with clear assertions and minimal setup.
6. **Isolation**: Tests should be isolated from each other and not depend on test order.
7. **Accessibility Testing**: Include tests for accessibility concerns where appropriate.
8. **Snapshot Testing**: Use sparingly and review changes carefully.

## Continuous Integration

Tests are run automatically on pull requests via GitHub Actions. The workflow configuration is in `.github/workflows/test.yml`.

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Mock Service Worker Documentation](https://mswjs.io/docs/) 