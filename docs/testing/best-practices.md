# FoxLabs//Creative Portfolio Website - Testing Best Practices

This document outlines the testing approach, best practices, and common issues for the FoxLabs//Creative portfolio website.

## 1. Testing Structure

- `__tests__/` - Contains all test files, organized by folders matching the structure of components/pages:
  - `__tests__/pages/` - Tests for Next.js page components
  - `__tests__/core/` - Tests for core UI components
  - `__tests__/components/` - Tests for shared components

## 2. Mock Data

Mock data is available in:
- `__tests__/fixtures/mockData.ts` - Contains mock project and service data for testing

## 3. Common Testing Patterns

### 3.1 Mocking Approach

When testing components that use external data or components, use the following mocking pattern:

```tsx
// Define mock data first
const mockTeamMembers = [
  { name: 'John Doe', role: 'Creative Director', image: '/images/team/member1.jpg' },
  { name: 'Jane Smith', role: 'Lead Developer', image: '/images/team/member2.jpg' },
  { name: 'Sam Wilson', role: 'Design Lead', image: '/images/team/member3.jpg' }
];

// Mock dependencies before importing the component under test
jest.mock('@/lib/data', () => ({
  getTeamMembers: () => mockTeamMembers,
  getProjects: jest.requireActual('@/lib/data').getProjects,
  getServices: jest.requireActual('@/lib/data').getServices
}));

// Import the component after mocking
import AboutPage from '@/app/about/page';
```

### 3.2 Component Mocking

For complex components with many dependencies, mock child components:

```tsx
// Mock layout components
jest.mock('@/components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="header" />;
  };
});

jest.mock('@/components/layout/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer" />;
  };
});
```

### 3.3 Testing Empty States

Always test components with both normal and edge cases:

```tsx
// Test with empty data
it('still renders the team section even with empty team data', () => {
  render(<AboutPage />);
  expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
});

it('does not render any team member cards when team array is empty', () => {
  render(<AboutPage />);
  const teamSection = screen.getByText('OUR TEAM').closest('section');
  const teamCards = within(teamSection).queryAllByTestId('team-member-card');
  expect(teamCards.length).toBe(0);
});
```

### 3.4 Handling Next.js Image Component

The Next.js Image component needs special handling in tests:

```tsx
jest.mock('next/image', () => {
  return function MockImage(props) {
    // Convert boolean 'fill' to string to avoid React DOM warnings
    const imgProps = {...props};
    if (typeof props.fill === 'boolean') {
      imgProps.fill = props.fill.toString();
    }
    return <img {...imgProps} />;
  };
});
```

### 3.5 Handling Framer Motion Components

For Framer Motion components, create simple mock implementations:

```tsx
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: (props) => <div {...props} data-testid={`motion-div-${props.className || 'default'}`} />,
      h1: (props) => <h1 {...props} data-testid={`motion-h1-${props.className || 'default'}`} />,
      span: (props) => <span {...props} data-testid={`motion-span-${props.className || 'default'}`} />,
      // Add more components as needed
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});
```

## 4. Common Issues and Solutions

### 4.1 Jest Hoisting Issues

**Problem**: `Cannot access 'mockTeamMembers' before initialization` error.

**Solution**: Define mock data before using it in `jest.mock()`:

```tsx
// ❌ Incorrect order
jest.mock('@/lib/data', () => ({
  getTeamMembers: () => mockTeamMembers // Error: mockTeamMembers not defined yet
}));
const mockTeamMembers = [...]; 

// ✅ Correct order
const mockTeamMembers = [...];
jest.mock('@/lib/data', () => ({
  getTeamMembers: () => mockTeamMembers
}));
```

### 4.2 Text Matching Issues

**Problem**: Unable to find text elements when they span multiple DOM elements.

**Solution**: Use `{ exact: false }` option with `getByText`:

```tsx
// ❌ May fail if "WHO WE ARE" spans multiple elements
expect(screen.getByText('WHO')).toBeInTheDocument();

// ✅ More robust approach
expect(screen.getByText('WHO WE ARE', { exact: false })).toBeInTheDocument();
```

### 4.3 React Warnings for Boolean Attributes

**Problem**: React DOM warnings about non-boolean attributes like `fill` from Next.js Image.

**Solution**: Convert boolean attributes to strings in mocks:

```tsx
// Convert boolean props to strings
if (typeof props.fill === 'boolean') {
  imgProps.fill = props.fill.toString();
}
```

## 5. Current Test Coverage

As of the latest update, test coverage is:
- Statements: 44.04%
- Branches: 20.79%
- Functions: 26.1%
- Lines: 49.54%

The global coverage thresholds are set to 80% for all metrics, which indicates further test development is needed.

## 6. Improving Test Coverage

To improve test coverage:

1. Focus on core components and pages first
2. Create tests for edge cases and error states
3. Test user interactions using `fireEvent` or `userEvent`
4. Verify that accessibility features work correctly

## 7. Running Tests

Run all tests:
```
npm test
```

Run a specific test file:
```
npm test -- __tests__/pages/AboutPage.test.tsx
```

Run tests with coverage report:
```
npm test -- --coverage
```

## 8. Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not how it does it
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText`, and `getByText` over `getByTestId`
3. **Isolate tests**: Each test should be independent and not rely on state from other tests
4. **Mock minimum required**: Only mock what is necessary for the test to run
5. **Test edge cases**: Test empty states, error states, and loading states
6. **Follow AAA pattern**: Arrange, Act, Assert
7. **Keep tests simple**: Each test should verify one specific behavior 