# Testing

This project uses Jest and React Testing Library for testing React components and utilities in a Next.js TypeScript environment.

## Setup

The testing environment is already configured with:

- Jest for running tests and assertions
- React Testing Library for rendering and testing React components
- TypeScript support for typed tests
- Mocks for CSS modules, static files, Next.js components, and framer-motion
- Coverage reports
- Custom API mocking with `simpleMock.ts` for testing fetch requests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- Tests are located in the `__tests__` directory
- Each test file follows the naming convention: `ComponentName.test.tsx` or `utility.test.ts`
- Component tests should test rendering, props, and interactions
- Utility tests should test function inputs and outputs

## Writing Tests

Example component test:

```tsx
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    render(<Badge>Test Badge</Badge>);
    
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });
});
```

Example utility test:

```tsx
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });
});
```

## API Testing

The project uses a custom API mocking solution in `src/mocks/simpleMock.ts` that intercepts fetch requests during tests:

```tsx
// Example component test with API mocking
import { render, screen, waitFor } from '@testing-library/react';
import { ProjectList } from '@/components/project-list';

describe('ProjectList Component', () => {
  it('fetches and displays projects', async () => {
    render(<ProjectList />);
    
    // Wait for API call to resolve
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });
  });
});
```

The API mock automatically handles these endpoints:
- `/api/projects` - Returns all projects
- `/api/projects/:id` - Returns a specific project
- `/api/projects/category/:category` - Returns projects filtered by category
- `/api/services` - Returns all services
- `/api/services/:title` - Returns a specific service
- `/api/team` - Returns team members

## Mocks

The testing setup includes mocks for:

- CSS and SCSS modules
- Static files (images, etc.)
- Next.js components (Image, Link, etc.)
- Framer Motion components and hooks
- Window matchMedia API
- API endpoints via a custom fetch implementation

These mocks are configured in:
- `jest.setup.js` - General mocks and global setup
- `__mocks__/styleMock.js` - CSS mock
- `__mocks__/fileMock.js` - Static files mock
- `src/mocks/simpleMock.ts` - API mocking

## Test Environment

The project uses `jest-environment-jsdom-global` for testing, which provides all DOM APIs including:
- `Response`
- `Request`
- `Headers`
- Other global Web APIs needed for testing

## Troubleshooting

Common issues and solutions:

1. **Missing DOM APIs**: If you encounter errors about missing DOM APIs (like "Response is not defined"), make sure you're using the `jest-environment-jsdom-global` environment in your Jest config.

2. **Fetch not working in tests**: The fetch API is automatically mocked in tests. If your test requires a specific response, you may need to extend the mock implementation in `src/mocks/simpleMock.ts`.

3. **React Testing Library queries not finding elements**: Make sure you're using the correct query method and that your component is rendering as expected. Use `screen.debug()` to see the current state of the DOM.

## Coverage Reports

Coverage reports are generated in the `coverage` directory and excluded from Git. You can view the HTML report by opening `coverage/lcov-report/index.html` in your browser after running:

```bash
npm run test:coverage
``` 