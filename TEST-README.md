# Testing

This project uses Jest and React Testing Library for unit and integration testing, and Cypress for end-to-end testing in a Next.js TypeScript environment.

## Test Coverage

![Statements](public/badges/badge-statements.svg)
![Branches](public/badges/badge-branches.svg)
![Functions](public/badges/badge-functions.svg)
![Lines](public/badges/badge-lines.svg)

## Coverage Goals

This project aims for 80% test coverage across:
- Statements
- Branches
- Functions
- Lines

Coverage reports are generated for:
- Unit tests (Jest)
- End-to-end tests (Cypress)
- Combined coverage (nyc)

Coverage badges are automatically updated on push to main branch and pull requests.

## Setup

The testing environment is already configured with:

- Jest for running unit and integration tests and assertions
- React Testing Library for rendering and testing React components
- Cypress for end-to-end testing of user flows
- TypeScript support for typed tests
- Mocks for CSS modules, static files, Next.js components, and framer-motion
- Coverage reports (both individual and combined)
- Custom API mocking with `simpleMock.ts` for testing fetch requests

## Configuration Files

### Jest Configuration
- `jest.config.js` - Main Jest configuration
- `jest.setup.js` - Global setup and mocks for Jest tests
- `.jest-cache` - Cache directory for faster Jest runs

### Cypress Configuration
- `cypress.config.ts` - Main Cypress configuration including baseUrl and plugins
- `cypress/tsconfig.json` - TypeScript configuration for Cypress
- `cypress/support/commands.ts` - Custom Cypress commands
- `cypress/support/e2e.ts` - Global setup for E2E tests
- `.nycrc` - Configuration for code coverage reporting

### Coverage Integration 
- `scripts/combine-coverage.js` - Script to combine Jest and Cypress coverage reports

## Running Tests

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run all Jest tests
npm test

# Run Jest tests in watch mode (for development)
npm run test:watch

# Run Jest tests with coverage report
npm run test:coverage

# Open Cypress test runner
npm run cypress

# Run Cypress tests with the dev server
npm run test:e2e

# Run Cypress tests headlessly (CI/CD)
npm run test:e2e:headless

# Run all tests (Jest + Cypress)
npm run test:all

# Generate combined coverage report
npm run coverage:combine
```

## Test Structure

### Jest Tests
- Jest tests are located in the `__tests__` directory
- Each test file follows the naming convention: `ComponentName.test.tsx` or `utility.test.ts`
- Component tests should test rendering, props, and interactions
- Utility tests should test function inputs and outputs

### Cypress Tests
- Cypress tests are located in the `cypress/e2e` directory
- Each test file follows the naming convention: `feature.cy.ts`
- E2E tests should test full user journeys through the application
- Custom commands for testing specific behaviors are in `cypress/support/commands.ts`

## Writing Tests

### Jest Component Tests

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

### Jest Utility Tests

Example utility test:

```tsx
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });
});
```

### Cypress E2E Tests

Example Cypress test:

```typescript
describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.get('h1').should('exist');
    cy.checkCustomCursor();
  });

  it('should allow navigation to projects page', () => {
    cy.contains('a', /work|projects/i).click();
    cy.url().should('include', '/work');
    cy.get('h1').should('contain', /work|projects/i);
  });
});
```

## Custom Cypress Commands

The project includes custom Cypress commands for testing the custom cursor behavior and other specific features:

```typescript
// Check if custom cursor is visible
cy.checkCustomCursor();

// Interact with elements that have custom cursor behavior
cy.get('.button').hoverWithCustomCursor();

// Navigate and wait for page to fully load
cy.navigateAndWait('/work');
```

## Testing the Custom Cursor

The RAW/STUDIO portfolio site features a custom cursor with contextual text that changes based on the element being hovered. Specialized commands have been created to test this behavior:

```typescript
// Test cursor visibility
it('should show custom cursor', () => {
  cy.visit('/');
  cy.checkCustomCursor();
});

// Test cursor text changes on hover
it('should update cursor text when hovering projects', () => {
  cy.visit('/work');
  cy.get('[data-testid="project-card"]').first()
    .hoverWithCustomCursor();
  
  // The cursor text should have updated
  cy.get('[data-cursor-text]').should('be.visible');
});

// Test cursor text disappears on mouse leave
it('should clear cursor text on mouse leave', () => {
  cy.visit('/');
  cy.get('nav a').first()
    .trigger('mouseenter')
    .trigger('mouseleave');
    
  cy.get('[data-cursor-text]').should('not.be.visible');
});
```

Important considerations when testing the custom cursor:
- Elements must have the appropriate data attributes (`data-cursor`, `data-cursor-text`)
- Cursor text changes should be tested after hover interactions
- The cursor should reset when the mouse leaves interactive elements

## Testing Brutalist Design Elements

The brutalist design of the portfolio has specific visual and interactive characteristics that should be tested:

1. **Raw Typography**: Ensure text elements have the correct font styles and weights
2. **Grid Layouts**: Verify that elements maintain their grid positions across viewports
3. **Animated Elements**: Test that entrances and hover animations work correctly
4. **Staggered Animations**: Verify child elements animate in sequence

Example test for staggered animations:

```typescript
it('should animate children in sequence', () => {
  cy.visit('/work');
  
  // Items should have staggered animation classes
  cy.get('[data-testid="project-card"]').each(($el, index) => {
    // Items should have different animation delay attributes
    cy.wrap($el).should('have.attr', 'style')
      .and('include', `--animation-delay: ${index * 0.1}s`);
  });
});
```

## Testing Framer Motion and Radix UI Components

The RAW/STUDIO portfolio website relies heavily on Framer Motion animations and Radix UI components. Specialized testing utilities have been created to facilitate testing these components.

### Testing Utilities

The testing infrastructure includes utilities in `src/tests/test-utils/` for handling both libraries:

#### Framer Motion Testing Utilities

1. **MockAnimatePresence**: A mock implementation of Framer Motion's `AnimatePresence`
2. **createMotionComponent**: Creates a mock for any motion component
3. **verifyAnimation**: Checks if a Framer Motion animation was triggered correctly
4. **testAnimatePresenceToggle**: Tests if `AnimatePresence` correctly handles component mounting/unmounting

#### Radix UI Testing Utilities

1. **checkRadixAccessibility**: Checks if a Radix UI component has correct accessibility attributes
2. **testRadixTriggerToggle**: Tests if a Radix UI Trigger toggles its controlled content correctly
3. **renderWithRadix**: Custom render function that includes any providers needed by Radix UI components
4. **createMockRadixPortal**: Creates mocks for Radix Portal components to render content inline
5. **waitForRadixAnimation**: Utility to wait for a Radix animation to complete in tests

### Quick Start Example

To test a component that uses Framer Motion animations and/or Radix UI components:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YourComponent } from '@/components/your-component';
import { renderWithRadix, verifyAnimation } from '@/src/tests/test-utils';

// Use the provided mocks or add component-specific mocks
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div data-framer-motion-props={JSON.stringify({
      initial: props.initial,
      animate: props.animate,
      exit: props.exit
    })} {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('YourComponent', () => {
  it('renders correctly with animations', async () => {
    const { container } = renderWithRadix(<YourComponent />);
    
    // Test your component
    const element = screen.getByTestId('animated-element');
    expect(element).toBeInTheDocument();
    
    // Check animation properties
    const animationProps = JSON.parse(element.getAttribute('data-framer-motion-props') || '{}');
    expect(animationProps.animate).toHaveProperty('opacity', 1);
  });
});
```

### Handling Common Challenges

#### 1. Animation Timing Issues

Framer Motion animations can cause testing issues due to timing. Our mocks prevent this by removing actual animations while preserving the component structure:

```tsx
// In your test
jest.mock('framer-motion', () => ({
  motion: {
    div: (props) => <div data-testid="motion-element" {...props} />,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
```

#### 2. Radix UI Portals

Radix UI components often use portals which render outside the test container. Our mocks render these inline:

```tsx
// In your test
jest.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }) => <div data-testid="portal-content">{children}</div>,
}));
```

#### 3. Testing Animation States

To test if animations are triggered correctly:

```tsx
it('applies animations on hover', async () => {
  render(<AnimatedButton />);
  const button = screen.getByRole('button');
  
  // Hover over button
  await userEvent.hover(button);
  
  // Check if animation was applied
  expect(button).toHaveAttribute('data-framer-motion-props');
  const props = JSON.parse(button.getAttribute('data-framer-motion-props') || '{}');
  expect(props.whileHover).toEqual({ scale: 1.1 });
});
```

#### 4. Testing Radix UI Accessibility

To ensure Radix UI components maintain proper accessibility:

```tsx
it('maintains accessibility attributes', async () => {
  render(<Dialog />);
  const trigger = screen.getByRole('button');
  
  // Check attributes
  checkRadixAccessibility(trigger, { 
    role: 'button',
    expanded: false,
    controls: 'dialog-content'
  });
});
```

#### 5. Suppressing Radix UI Console Warnings

Radix UI components often produce console warnings in tests when certain accessibility attributes are missing. To suppress these warnings in your tests, you can:

```tsx
// In your test file or setup
const originalConsoleWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    // Filter out specific Radix UI warnings
    if (args[0]?.includes && args[0].includes('Missing `Description`')) {
      return;
    }
    originalConsoleWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalConsoleWarn;
});
```

### Best Practices

1. **Data Attributes**: Add `data-testid` attributes to animated elements for easier testing
2. **Isolate Animation Logic**: Use custom hooks for complex animations to test them separately
3. **Test Functionality First**: Focus on testing component behavior rather than animation details
4. **Mock At the Right Level**: Mock at the component level when possible rather than globally
5. **Accessibility**: Always test that animations don't interfere with accessibility features

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

### Fetch API Polyfill (jest.polyfill.js)

For testing API client functions directly, the project uses a custom fetch polyfill in `jest.polyfill.js`. This polyfill:

1. Automatically loads test data from `lib/data.ts`
2. Overrides the global fetch function to return controlled responses
3. Provides detailed logging of API requests during tests
4. Supports both success and error response simulation

#### Implementation Details

The polyfill uses `Object.defineProperty` with getters to ensure that fetch is properly overridden in all contexts (global, window, etc.). The mock implementation returns response objects with the correct shape needed by modern fetch APIs:

```javascript
// Example of the mock implementation in jest.polyfill.js
async function myFetch(input, init) {
  console.log('myFetch called with:', input);
  
  // If the global error simulation flag is set, return an error response
  if (global.__simulateFetchError__ === true) {
    console.log('Simulating error response for:', input);
    return {
      ok: false,
      status: 500,
      json: async () => ({ error: 'Simulated fetch error' })
    };
  }
  
  try {
    const url = new URL(input.toString(), 'http://localhost');
    const path = url.pathname;
    console.log('Parsed path:', path);
    
    // Returns appropriate data based on the path
    if (path === '/api/projects') {
      return {
        ok: true,
        status: 200,
        json: async () => projects
      };
    }
    
    // Handle /api/projects/:id
    if (path.match(/^\/api\/projects\/\d+$/)) {
      const id = parseInt(path.split('/').pop() || '0', 10);
      const project = projects.find(p => p.id === id);
      
      if (project) {
        return {
          ok: true,
          status: 200,
          json: async () => project
        };
      } else {
        return {
          ok: false,
          status: 404,
          json: async () => ({ error: 'Project not found' })
        };
      }
    }
    
    // Additional endpoint handling for other API routes...
  } catch (error) {
    console.error('Error in myFetch:', error);
    return {
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' })
    };
  }
}

// Override global fetch
Object.defineProperty(globalThis, 'fetch', {
  get: () => myFetch,
  configurable: true
});
```

#### Testing Success Cases

By default, the polyfill returns successful responses for recognized API endpoints:

```typescript
// In your test file
import { fetchProjects } from '@/src/api/client';

describe('API Client Functions', () => {
  it('successfully fetches projects', async () => {
    const projects = await fetchProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty('title');
  });
});
```

#### Testing Error Cases

To test error handling in your API client functions, you can set the global `__simulateFetchError__` flag to make the polyfill return error responses:

```typescript
// In your test file
import { fetchProjects } from '@/src/api/client';

describe('API Client Functions', () => {
  it('handles fetch errors appropriately', async () => {
    // Set the global flag to simulate an error response
    global.__simulateFetchError__ = true;
    
    try {
      // This should now throw an error
      await expect(fetchProjects()).rejects.toThrow('Failed to fetch projects');
    } finally {
      // Reset the flag to not affect other tests
      global.__simulateFetchError__ = false;
    }
  });
});
```

#### Benefits of This Approach

1. **Deterministic Testing**: Tests run with consistent, predetermined responses
2. **No Network Dependencies**: No actual network calls are made during tests
3. **Fast Execution**: Tests run quickly without waiting for real API calls
4. **Complete Control**: You can precisely control what each endpoint returns
5. **Typed Responses**: The mock returns correctly typed data from your application

#### Extending the Polyfill

If you need to add support for new endpoints, extend the myFetch implementation in `jest.polyfill.js`:

```javascript
// Adding a new endpoint handler
if (path === '/api/new-endpoint') {
  return {
    ok: true,
    status: 200,
    json: async () => newEndpointData
  };
}
```

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

### Jest Environment
The project uses `jest-environment-jsdom-global` for testing, which provides all DOM APIs including:
- `Response`
- `Request`
- `Headers`
- Other global Web APIs needed for testing

### Cypress Environment
Cypress tests run in a real browser environment with:
- TypeScript support via `cypress/tsconfig.json`
- Code coverage instrumentation via `@cypress/code-coverage`
- Testing Library integration via `@testing-library/cypress`
- Custom commands for testing the brutalist design UI and custom cursor

## Coverage Reports

### Individual Coverage Reports
Coverage reports are generated in the `coverage` directory and excluded from Git:
- Jest coverage in `coverage/jest`
- Cypress coverage in `coverage/cypress`

You can view the Jest HTML report by opening `coverage/jest/lcov-report/index.html` in your browser.

### Combined Coverage Reports
This project supports combined coverage reporting from both Jest and Cypress tests:

```bash
# Generate a combined coverage report
npm run coverage:combine
```

The combined report is available in `coverage/combined/index.html`.

## Troubleshooting

Common issues and solutions:

1. **Missing DOM APIs**: If you encounter errors about missing DOM APIs (like "Response is not defined"), make sure you're using the `jest-environment-jsdom-global` environment in your Jest config.

2. **Fetch not working in tests**: The fetch API is automatically mocked in tests. If your test requires a specific response, you may need to extend the mock implementation in `src/mocks/simpleMock.ts`.

3. **React Testing Library queries not finding elements**: Make sure you're using the correct query method and that your component is rendering as expected. Use `screen.debug()` to see the current state of the DOM.

4. **Cypress tests failing due to custom cursor**: Make sure elements have the appropriate data attributes (`data-cursor`, `data-cursor-text`) for the custom cursor commands to work correctly.

5. **Combined coverage reports not working**: Ensure both Jest and Cypress tests are generating their individual coverage reports before combining them.

6. **Animations interfering with tests**: If Framer Motion animations cause test flakiness, use the `matchMedia` mock to simulate reduced motion preferences during testing or use the custom testing utilities in `src/tests/test-utils/`. 

## Data Utility Functions Tests

The data utility functions handle the transformation, filtering, and validation of data before it's passed to the UI components. These tests ensure that the utility functions work correctly with various inputs, including edge cases.

### API Client Function Tests (`__tests__/api/client.test.ts`)

These tests verify that the API client functions correctly fetch and process data. They use mocked API responses to ensure the functions handle both successful and error cases properly.

#### Covered Functionality:

- `fetchProjects`: Gets all projects
- `fetchProjectById`: Retrieves a specific project by ID
- `fetchProjectsByCategory`: Filters projects by category
- `fetchServices`: Gets all services
- `fetchServiceByTitle`: Retrieves a specific service by title
- `fetchTeamMembers`: Gets all team members

#### Test Cases:

- Successful data fetching
- Error handling
- URL encoding for parameters with special characters
- Empty data handling
- Parameter validation

### Data Filtering Tests (`__tests__/mocks/filters.test.ts`)

These tests focus on the functions that filter and search through the portfolio data, ensuring that filtering logic works correctly.

#### Covered Functionality:

- `filterProjectsByCategory`: Filters projects by matching category
- `findServiceByTitle`: Finds a service by matching title

#### Test Cases:

- Basic filtering functionality
- Case-insensitive matching
- Empty array handling
- No matches scenarios
- Complete result validation

### Data Validation Tests (`__tests__/utils/dataValidation.test.ts`)

These tests focus on validating the structure and content of data objects to ensure they meet the expected shape before being displayed.

#### Covered Functionality:

- Type guard functions for checking if objects match expected interfaces
- Utility functions that aggregate or transform data

#### Test Cases:

- Validation of complete objects
- Validation of objects with missing fields
- Handling of invalid data types
- Edge cases like null or undefined values
- Functions to extract aggregate data like all categories or services

### Mock Data Fixtures (`__tests__/fixtures/mockData.ts`)

This file provides simplified mock data for testing purposes. It includes:

- Mock projects with various properties and edge cases
- Mock services with different configurations
- Mock team members
- Mock testimonials and other related data types

The fixtures are designed to be lightweight while still covering a range of scenarios needed for thorough testing.

### Test Philosophy

1. **Isolation**: Each test focuses on a single functionality
2. **Completeness**: Tests cover both happy paths and error conditions
3. **Edge Cases**: Special attention to nulls, undefined values, empty arrays, and type mismatches
4. **Performance**: Mock data is kept minimal while still testing all scenarios
5. **Readability**: Test cases are clearly labeled and organized by functionality

### Running the Tests

To run all the data utility tests:

```bash
npm test -- --testPathPattern=__tests__/(api|mocks|utils)
```

To run a specific set of tests:

```bash
# API Client tests
npm test -- --testPathPattern=__tests__/api/client.test.ts

# Filtering tests
npm test -- --testPathPattern=__tests__/mocks/filters.test.ts

# Data validation tests  
npm test -- --testPathPattern=__tests__/utils/dataValidation.test.ts
``` 