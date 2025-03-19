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