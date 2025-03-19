# RAW/STUDIO Portfolio Website - Test Documentation

This document provides an overview of the test strategy and implementation for the RAW/STUDIO portfolio website. It covers unit tests, integration tests, and end-to-end tests, focusing on the testing of project-related components.

## 1. Testing Strategy

The testing strategy follows a comprehensive approach with multiple layers:

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user flows using Cypress

### 1.1 Testing Libraries

- **Jest**: The main test runner
- **React Testing Library**: For testing React components
- **user-event**: For simulating user interactions
- **jest-axe**: For accessibility testing
- **Cypress**: For end-to-end testing

## 2. Unit Test Structure

### 2.1 Component Tests

The unit tests for project-related components are organized by component type in the `__tests__` directory:

- `__tests__/core`: Core business components like ProjectCard, ProjectDetail
- `__tests__/pages`: Page components like WorkPage
- `__tests__/fixtures`: Mock data for test isolation

### 2.2 Test Naming Convention

Test files follow this naming convention:
- `ComponentName.test.tsx`: For component tests
- `util-name.test.ts`: For utility function tests

### 2.3 Mocking Strategy

- External components are mocked when testing a specific component
- The `useCursor` hook is mocked to test cursor text behavior
- Mock data is used instead of actual data to ensure test isolation

## 3. Project Component Tests

### 3.1 ProjectCard Tests (`__tests__/core/ProjectCard.test.tsx`)

The ProjectCard tests verify the following:

- Rendering with required fields only
- Rendering with all fields
- Detailed mode with description
- Cursor text behavior on hover

### 3.2 ProjectDetail Tests (`__tests__/core/ProjectDetail.test.tsx`)

The ProjectDetail tests verify the following:

- Rendering with all fields
- Rendering with minimal fields
- Closing behavior
- Gallery navigation
- Cursor text behavior
- External link behavior

### 3.3 ProjectGallery Tests (`__tests__/core/ProjectGallery.test.tsx`)

The ProjectGallery tests (embedded in ProjectDetail) verify the following:

- Default gallery image display
- Gallery navigation rendering
- Gallery navigation functionality
- Gallery pagination
- Image looping behavior

### 3.4 WorkPage Tests (`__tests__/pages/WorkPage.test.tsx`)

The WorkPage tests verify the following:

- Project list rendering
- Project filtering (if implemented)
- Project selection to open details
- Cursor behavior on project hover
- Navigation back to home

## 4. Test Run Instructions

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

## 5. Testing Edge Cases

The test suite includes tests for edge cases such as:

- Projects with minimal required fields
- Projects with all fields populated
- Projects with and without galleries
- Projects with single vs. multiple gallery images
- Long text content in descriptions and testimonials

## 6. Test Coverage

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

Notable coverage achievements:
- ProjectCard: 100% statement and function coverage
- WorkPage: 95% statement coverage
- hooks directory: 91.56% statement coverage, 94.87% line coverage
- lib directory: 97.77% statement coverage, 100% line coverage

Coverage reports are generated at `coverage/jest` after running `npm run test:coverage`.

## 7. Current Status and Next Steps

### 7.1 Current Test Status

The test suite currently includes:
- 30 test suites
- 243 passing tests
- 0 failing tests

Key tested components include:
- ProjectCard
- ProjectDetail
- ProjectGallery
- WorkPage
- AnimatedDialog (example component)
- Various UI utility components

### 7.2 Next Steps for Test Improvement

To improve test coverage and reach the target thresholds, the following areas need focus:

1. **Page Components**:
   - Create tests for HomePage component
   - Create tests for ServicesPage component
   - Create tests for AboutPage component

2. **Layout Components**:
   - Implement tests for Header and Footer components
   - Add tests for navigation functionality

3. **UI Components**:
   - Prioritize testing of commonly used UI components
   - Focus on components with complex user interactions

4. **Effects Components**:
   - Test CustomCursor component
   - Test CursorTrail component

5. **Section Components**:
   - Implement tests for ContactSection
   - Test form submission behavior

The approach should be to prioritize business-critical components and user-facing functionality first, then expand to utility and helper components.

## 8. Continuous Integration

Tests are automatically run in CI/CD pipeline on each push to ensure code quality. The following steps occur:

1. Lint check
2. Unit tests
3. E2E tests in headless mode
4. Coverage report generation
5. Deployment on test success

## 9. Accessibility Testing

Accessibility testing is implemented using jest-axe to ensure components meet WCAG 2.1 AA standards. All components are tested for accessibility violations.

## 10. Test Maintenance

When adding new features or modifying existing components:

1. Update mockData in `__tests__/fixtures/mockData.ts` if needed
2. Create new test files for new components
3. Update existing tests for modified components
4. Ensure test coverage remains above targets 

## 11. Known Test Warnings

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

## Service Component Tests

This document provides details about the unit tests for service-related components in the RAW/STUDIO portfolio website.

### Overview

The service component tests validate the functionality of components that display information about services offered by RAW/STUDIO. These tests cover various service data scenarios, ensuring components handle all required and optional fields correctly.

### Test Files

The following test files have been created for service-related components:

1. **ServiceItem.test.tsx**
   - Tests the individual service item component that displays a service title and optional description
   - Verifies proper rendering of services with minimal and complete data
   - Tests dark mode styling application
   - Validates cursor behavior on interactive elements

2. **ServiceList.test.tsx**
   - Tests rendering of multiple services in a list format
   - Verifies empty state handling
   - Tests cursor behavior on service list items
   - Validates service ordering

3. **ServiceDetails.test.tsx**
   - Tests detailed service view with complete information
   - Verifies rendering of various optional fields (benefits, process steps, case studies)
   - Tests case study link cursor behavior
   - Validates fallback state when no service is selected

4. **ServiceProcess.test.tsx**
   - Tests rendering of service process steps
   - Verifies correct ordering and numbering of steps
   - Validates handling of edge cases (empty, null, undefined process steps)
   - Tests handling of many process steps

5. **ServiceBenefits.test.tsx**
   - Tests rendering of service benefits list
   - Verifies fallbacks for empty, null, or undefined benefits
   - Tests handling of edge cases (single benefit, many benefits)
   - Validates rendering of benefits with special characters or long text

### Test Scenarios

The tests cover the following scenarios for service-related components:

1. **Data Variations:**
   - Services with all optional fields populated
   - Services with only required fields
   - Edge cases (many process steps, long benefit lists)

2. **Cursor Behavior:**
   - Custom cursor text display on hover
   - Cursor text clearing on mouse leave
   - Appropriate cursor text for different interactive elements

3. **Visual Display:**
   - Correct rendering of service titles and descriptions
   - Process steps displayed in proper order with numbering
   - Benefits properly listed with bullet points/icons
   - Case study information and links properly displayed

4. **Props and Variations:**
   - Dark mode styling application
   - Detailed vs. summary view rendering
   - Empty/null/undefined data handling

### Running the Tests

To run all service component tests:

```bash
npm test -- --testPathPattern=__tests__/core/Service
```

To run a specific service component test file:

```bash
npm test -- __tests__/core/ServiceItem.test.tsx
```

### Test Coverage

These tests provide comprehensive coverage of the service-related components, validating:

1. Proper rendering of all service data fields
2. Handling of different service data scenarios
3. Interactive behavior with cursor text
4. Edge cases and error states

The tests use Jest and React Testing Library to provide realistic user interaction testing while maintaining unit test isolation.

# Service Component Tests Documentation

## Overview

This document provides comprehensive documentation for the service component tests in the RAW/STUDIO portfolio website. These tests validate that all components displaying service information render correctly, handle various edge cases, and implement proper cursor behavior for interactive elements.

## Test Files

The service component tests are organized into both unit tests and integration tests:

### Unit Tests

1. **ServiceItem.test.tsx**
   - Tests the individual service item component that displays a service card
   - Validates rendering with different data scenarios and dark mode styling
   - Verifies cursor behavior on hover interactions

2. **ServiceList.test.tsx**
   - Tests the component that renders a list of service items
   - Checks rendering of multiple services and empty states
   - Validates cursor behavior during service navigation

3. **ServiceDetails.test.tsx**
   - Tests the component that displays detailed information about a service
   - Verifies rendering with complete and minimal data
   - Tests optional fields and cursor behavior on links

4. **ServiceProcess.test.tsx**
   - Tests the component that displays the process steps for a service
   - Validates rendering of process steps with titles and descriptions
   - Checks handling of edge cases like missing or empty data

5. **ServiceBenefits.test.tsx**
   - Tests the component that lists the benefits of a service
   - Checks rendering of benefits lists with different lengths
   - Validates fallback UI when no benefits are provided

### Integration Tests

6. **ServiceDetailsPage.test.tsx**
   - Tests the integration of multiple service components on a service details page
   - Validates that components work together correctly with different data structures
   - Checks cursor behavior across all interactive elements on the page
   - Tests conditional rendering based on available service data

## Test Scenarios

Each test suite covers the following scenarios:

- **Data Variations**: Testing components with complete data, minimal data, and edge cases (null/undefined)
- **Cursor Behavior**: Verifying proper cursor text updates on hover interactions
- **Visual Display**: Checking that content is correctly displayed and formatted
- **Props Handling**: Testing component behavior with different prop configurations
- **Integration**: Ensuring components work together correctly in page context

## Running the Tests

You can run the service component tests using the following commands:

```bash
# Run all service component tests
npm test -- --testPathPattern=__tests__/core/Service

# Run all integration tests
npm test -- --testPathPattern=__tests__/integration

# Run a specific service component test file
npm test -- __tests__/core/ServiceItem.test.tsx

# Run a specific integration test
npm test -- __tests__/integration/ServiceDetailsPage.test.tsx
```

## Test Coverage

These tests provide comprehensive coverage of the service-related components:

- **Unit Tests**: Each component is tested individually to ensure it renders and behaves correctly in isolation
- **Integration Tests**: Components are tested together to verify they work correctly when combined on a page
- **Edge Cases**: Tests ensure components handle minimal data, missing data, and other edge cases gracefully
- **Cursor Behavior**: Verifies that all interactive elements update the custom cursor correctly

All service components are tested with both complete and minimal data to ensure they handle all scenarios gracefully. Integration tests validate that components work well together and maintain proper behavior when combined on service detail pages.

## 7. Team Component Tests

### 7.1 Overview

The test suite for team-related components covers the `TeamMember` component and the team section of the About page. These components are responsible for displaying information about team members.

### 7.2 Test Files

The test suite consists of the following files:

- `__tests__/core/TeamMember.test.tsx`: Tests for the core TeamMember component
- `__tests__/core/TeamMemberEdgeCases.test.tsx`: Tests for edge cases in the TeamMember component
- `__tests__/pages/AboutPage.test.tsx`: Tests for the team section in the About page
- `__tests__/pages/AboutPageEmptyTeam.test.tsx`: Tests for the About page when no team members exist

### 7.3 TeamMember Component Tests

#### 7.3.1 Basic Functionality Tests

The `TeamMember.test.tsx` file contains tests for the basic functionality of the TeamMember component:

- **Rendering**: Tests that the component renders the team member's name, role, and image correctly.
- **Animation Props**: Tests that the component accepts and processes the index prop correctly for animations.
- **Image Handling**: Tests that the component displays a placeholder image when no image is provided.
- **Cursor Behavior**: Tests that the component updates the cursor text on hover and clears it on mouse leave.

#### 7.3.2 Edge Case Tests

The `TeamMemberEdgeCases.test.tsx` file contains tests for various edge cases:

- **Long Names**: Tests that the component can handle team members with very long names.
- **Long Roles**: Tests that the component can handle team members with very long role titles.
- **Missing Images**: Tests that the component handles missing images gracefully by displaying a placeholder.
- **Broken Image URLs**: Tests that the component handles broken image URLs.
- **Index Values**: Tests that the component handles negative and very large index values for animation delays.

### 7.4 About Page Team Section Tests

The `AboutPage.test.tsx` file contains tests specifically for the team section in the About page:

- **Rendering**: Tests that the team section renders with the correct heading.
- **Team Members**: Tests that all team members are displayed correctly.
- **Grid Layout**: Tests that team members are displayed in a proper grid layout with responsive columns.
- **Visual Effects**: Tests that the grayscale effect is applied to team member images and changes on hover.
- **Cursor Behavior**: Tests that the cursor text updates on team member hover and clears on mouse leave.

The `AboutPageEmptyTeam.test.tsx` file tests the About page when no team members exist:

- **Empty State Handling**: Tests that the team section still renders even when the team members array is empty.
- **No Team Members**: Verifies that no team member cards are rendered when the team array is empty.
- **Other Sections**: Confirms that other page sections still render correctly regardless of team data.

### 7.5 Mock Strategy

The tests use the following mocking strategy:

- **Data**: Team member data is mocked using `mockTeamMembers` from the fixtures.
- **Components**: Header, Footer, and ContactSection components are mocked to focus testing on the team section.
- **Animations**: Framer Motion is mocked to avoid animation-related complexities in testing.
- **Cursor Behavior**: The useCursor hook is mocked to verify cursor text updates.
- **Images**: Next.js Image component is mocked to simplify image testing.

### 7.6 Testing Coverage

The tests aim to provide comprehensive coverage of the team-related components, including:

- Basic rendering and display
- Responsive behavior
- Animations and transitions
- User interactions (hover effects, cursor behavior)
- Edge cases and error handling

### 7.7 Running Team Component Tests

To run the tests specifically for team components:

```bash
npm test -- --testPathPattern=TeamMember
npm test -- --testPathPattern=AboutPage
```

To run tests for the edge case of an empty team:

```bash
npm test -- --testPathPattern=AboutPageEmptyTeam
```

### 7.8 Accessibility Testing

The team component tests include basic accessibility checks:

- Proper alt text for images
- Semantic HTML structure
- Keyboard navigation

For more comprehensive accessibility testing, additional tests using tools like jest-axe are recommended.

## Future Improvements

Potential future improvements to the test suite:

- Add more comprehensive accessibility tests
- Test for specific animation parameters and timing
- Test for specific responsive behavior at different viewport sizes
- Add visual regression tests for the team section 

# Testing Documentation for RAW/STUDIO Portfolio Website

## Overview

This document outlines the testing approach, best practices, and common issues for the RAW/STUDIO portfolio website. The project uses Jest and React Testing Library for unit and integration testing.

## Testing Structure

- `__tests__/` - Contains all test files, organized by folders matching the structure of components/pages:
  - `__tests__/pages/` - Tests for Next.js page components
  - `__tests__/core/` - Tests for core UI components
  - `__tests__/components/` - Tests for shared components

## Mock Data

Mock data is available in:
- `__tests__/fixtures/mockData.ts` - Contains mock project and service data for testing

## Common Testing Patterns

### 1. Mocking Approach

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

### 2. Component Mocking

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

### 3. Testing Empty States

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

### 4. Handling Next.js Image Component

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

### 5. Handling Framer Motion Components

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

## Common Issues and Solutions

### 1. Jest Hoisting Issues

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

### 2. Text Matching Issues

**Problem**: Unable to find text elements when they span multiple DOM elements.

**Solution**: Use `{ exact: false }` option with `getByText`:

```tsx
// ❌ May fail if "WHO WE ARE" spans multiple elements
expect(screen.getByText('WHO')).toBeInTheDocument();

// ✅ More robust approach
expect(screen.getByText('WHO WE ARE', { exact: false })).toBeInTheDocument();
```

### 3. React Warnings for Boolean Attributes

**Problem**: React DOM warnings about non-boolean attributes like `fill` from Next.js Image.

**Solution**: Convert boolean attributes to strings in mocks:

```tsx
// Convert boolean props to strings
if (typeof props.fill === 'boolean') {
  imgProps.fill = props.fill.toString();
}
```

## Current Test Coverage

As of the latest update, test coverage is:
- Statements: 44.04%
- Branches: 20.79%
- Functions: 26.1%
- Lines: 49.54%

The global coverage thresholds are set to 80% for all metrics, which indicates further test development is needed.

## Improving Test Coverage

To improve test coverage:

1. Focus on core components and pages first
2. Create tests for edge cases and error states
3. Test user interactions using `fireEvent` or `userEvent`
4. Verify that accessibility features work correctly

## Running Tests

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

## Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not how it does it
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText`, and `getByText` over `getByTestId`
3. **Isolate tests**: Each test should be independent and not rely on state from other tests
4. **Mock minimum required**: Only mock what is necessary for the test to run
5. **Test edge cases**: Test empty states, error states, and loading states
6. **Follow AAA pattern**: Arrange, Act, Assert
7. **Keep tests simple**: Each test should verify one specific behavior 