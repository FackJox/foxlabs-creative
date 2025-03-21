# Projects Page Integration Tests

This document outlines the integration tests implemented for the Projects page of the FoxLabs//Creative portfolio website. These tests verify the complete functionality of the Projects page, including rendering, user interactions, data flow, animations, and responsive behavior.

## Test File

The integration tests for the Projects page can be found in:

- `__tests__/integration/ProjectsPage.test.tsx`

## Test Coverage

The integration tests for the Projects page cover the following key aspects:

1. **Page Structure and Rendering**
   - Verifies that the page renders with all required sections (header, projects list, footer)
   - Checks that project cards are correctly rendered with project data
   - Ensures that the page displays the correct number of project cards

2. **Project Data Display**
   - Verifies that each project card displays the correct title, category, and year
   - Ensures that project images are properly loaded
   - Tests that project descriptions are correctly displayed

3. **Category Filtering**
   - Tests that clicking on a category filter correctly filters the displayed projects
   - Verifies that the "Clear Filters" button restores all projects
   - Ensures that filtering maintains correct UI state for active filters

4. **Navigation to Project Details**
   - Tests that clicking a project card opens the project detail modal
   - Verifies that the modal displays the correct project information

5. **Loading and Error States**
   - Tests the loading indicator when data is being fetched
   - Verifies error handling when project data fails to load
   - Tests that the retry button functions correctly

6. **Custom Cursor Interaction**
   - Verifies that cursor text updates when hovering over interactive elements
   - Tests cursor behavior on project cards, filter buttons, and navigation elements
   - Ensures cursor text is cleared when leaving interactive elements

7. **Responsive Behavior**
   - Tests layout adaptation for mobile devices
   - Verifies that the grid layout changes based on viewport size

8. **Animation Sequences**
   - Tests that animations are triggered in the correct sequence
   - Verifies that animation components are correctly implemented

## Mock Implementation

The tests use several mock implementations to isolate the Projects page component for testing:

1. **Mock Data**
   - Uses a hardcoded array of mock projects with different category values to test filtering
   - Projects are structured to include all required fields (id, title, category, year, image, description, client)

2. **Module Mocking Approach**
   - Uses `jest.doMock()` instead of `jest.mock()` to avoid hoisting issues
   - Places all mock implementations before any component imports
   - Imports the actual component under test only after all mocks are set up
   - Wraps test execution in a function that runs after all mocks are defined

3. **Mocked Modules**
   - `@/lib/data`: Mocked to return controlled test data
   - `next/image`: Mocked to render standard img elements with appropriate props
   - `next/navigation`: Mocked router functions (push, back, forward)
   - `framer-motion`: Mocked to render static elements instead of animated ones
   - `@/hooks/use-cursor`: Mocked to track cursor text changes

4. **Framer Motion Mocking**
   - Uses `React.createElement()` to create proper React elements
   - Maps each motion component (div, h1, h2, etc.) to its equivalent HTML element
   - Preserves props such as className and onClick
   - Adds data-testid attributes for reliable element selection
   - Handles children components properly

5. **UI Simulation**
   - Uses React Testing Library's `userEvent` for realistic user interactions
   - Uses `act()` to properly handle asynchronous state updates
   - Mocks window properties for responsive layout testing

## Test Setup

Each test includes detailed setup:

1. **Window Mocks**
   - Mocks `window.matchMedia` for responsive layout testing
   - Preserves original window properties and restores them after tests

2. **Component Mocks**
   - Mocks the cursor hook to track cursor text changes
   - Mocks Framer Motion components to prevent animation issues in tests

3. **State Mocks**
   - Mocks React state hooks for testing loading and error states
   - Uses `mockAllIsIntersecting` to simulate visibility for Intersection Observer elements

## Test Scenarios

The test suite includes the following specific test scenarios:

1. **Basic Page Rendering**
   ```javascript
   it('renders the page with header, project list, and footer', async () => {
     render(<WorkPage />);
     // Verification checks using getAllByText for elements that might appear multiple times
   });
   ```

2. **Project Data Display**
   ```javascript
   it('displays project cards with correct data', async () => {
     render(<WorkPage />);
     // Verification using getAllByText for categories that might appear multiple times
   });
   ```

3. **Category Filtering**
   ```javascript
   it('filters projects when a category filter is clicked', async () => {
     render(<WorkPage />);
     // Filter click using userEvent.setup() and verification
   });
   ```

4. **Project Detail Navigation**
   ```javascript
   it('navigates to project detail when a project card is clicked', async () => {
     render(<WorkPage />);
     // Project card click using userEvent.setup() and verification
   });
   ```

5. **Loading State**
   ```javascript
   it('handles loading state', async () => {
     // Mock loading state using React.useState spies
     render(<WorkPage />);
     // Verification of navigation presence
   });
   ```

6. **Error State**
   ```javascript
   it('handles error state', async () => {
     // Mock error state using React.useState spies
     render(<WorkPage />);
     // Verification of error message
   });
   ```

7. **Cursor Behavior**
   ```javascript
   it('updates cursor text on interactive elements', async () => {
     // Mock cursor context
     render(<WorkPage />);
     // Verification that page renders with mock cursor context
   });
   ```

8. **Responsive Layout**
   ```javascript
   it('adapts to different viewport sizes', async () => {
     // Mock mobile viewport and matchMedia
     render(<WorkPage />);
     // Verification of grid classes for mobile layout
   });
   ```

9. **Animation Sequencing**
   ```javascript
   it('renders animations in correct sequence with motion components', async () => {
     // Animation testing with useFakeTimers and useEffect spy
     render(<WorkPage />);
     // Verification of animation triggers and completion
   });
   ```

## Best Practices Implemented

The Projects page integration tests demonstrate several testing best practices:

1. **Module Mocking Strategy**
   - Uses `jest.doMock()` instead of `jest.mock()` to avoid hoisting issues
   - Imports components and libraries after all mocks are defined
   - Wraps test execution in a function that runs after mocks are applied
   - Creates proper React elements for mocked components

2. **Reliable Element Selection**
   - Uses data-testid attributes for key elements
   - Uses `getAllByText` instead of `getByText` when multiple matches might exist
   - Uses role-based queries where appropriate (e.g., getByRole('navigation'))
   - Makes assertions more robust by checking element counts rather than exact matches

3. **Isolation of Tests**
   - Each test focuses on a specific feature or behavior
   - State is reset between tests with `jest.clearAllMocks()`

4. **Realistic User Interactions**
   - Uses `userEvent.setup()` instead of `fireEvent` for more realistic user behavior simulation
   - Properly waits for state updates after interactions with waitFor

5. **Responsive Testing**
   - Mocks different viewport sizes to test responsive behavior
   - Tests specific changes to layout based on viewport

6. **Animation Testing**
   - Uses Jest timers to control animation timing
   - Spies on animation-related effects to verify correct sequencing

7. **Handling Common Testing Pitfalls**
   - Properly handles components that use Framer Motion animations
   - Addresses React context usage (cursor context)
   - Properly mocks Next.js components and hooks
   - Creates consistent test behavior across different environments

## Handling Multiple Elements

A common issue in testing is handling multiple elements with the same text or properties. The tests use these approaches:

1. **Using getAllByText Instead of getByText**
   ```javascript
   // Instead of this (which would fail with multiple matches):
   expect(screen.getByText(/WEBSITE/i)).toBeInTheDocument();
   
   // Use this:
   expect(screen.getAllByText(/WEBSITE/i).length).toBeGreaterThan(0);
   ```

2. **Finding Elements by TestId**
   ```javascript
   const projectCards = screen.getAllByTestId('project-card');
   expect(projectCards.length).toBeGreaterThan(0);
   ```

3. **Using Specific Role Queries**
   ```javascript
   const navigation = screen.getByRole('navigation');
   expect(navigation).toBeInTheDocument();
   ```

## Running the Tests

To run the Projects page integration tests:

```bash
npm test -- __tests__/integration/ProjectsPage.test.tsx
```

For verbose output:

```bash
npm test -- __tests__/integration/ProjectsPage.test.tsx --verbose
```

## Troubleshooting Common Issues

1. **Jest Module Hoisting**
   - Problem: Jest hoists `jest.mock()` calls, causing reference errors
   - Solution: Use `jest.doMock()` which doesn't get hoisted

2. **Framer Motion in Tests**
   - Problem: Framer Motion animations cause issues in tests
   - Solution: Mock all motion components with static elements using React.createElement

3. **Multiple Element Matches**
   - Problem: Tests fail with "Found multiple elements" errors
   - Solution: Use `getAllByText` and check for length instead of presence

4. **Intersection Observer**
   - Problem: Elements using Intersection Observer aren't visible in tests
   - Solution: Use mockAllIsIntersecting(true) to make all elements visible

## Related Documentation

- [Project Components Tests](./components/project-components.md)
- [ProjectCard Tests](./components/ProjectCard.md)
- [Custom Cursor Tests](./components/custom-cursor.md)
- [Animation Integration Tests](./animation-integration-tests.md) 