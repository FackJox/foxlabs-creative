# Navigation Integration Tests

This document provides an overview of the integration tests implemented for navigation flows in the FoxLabs//Creative portfolio website. These tests verify that users can correctly navigate between different pages in the application and that the UI state updates appropriately.

## Test Coverage

The navigation integration tests cover the following scenarios:

1. **Navigation Between Main Sections**
   - Navigation between Home, Projects, and Services pages
   - Verification that content updates appropriately
   - Testing of active link highlighting

2. **Detail Page Navigation**
   - Navigation from listing pages to detail pages
   - Navigation back to listing pages from detail pages
   - Verification of correct URL parameters

3. **URL Management**
   - Verification that URLs update correctly during navigation
   - Testing query parameters are preserved as expected

4. **Browser History**
   - Testing browser back button functionality
   - Testing browser forward button functionality
   - Verification of history state management

5. **UI State**
   - Verification that active links are highlighted correctly
   - Testing that page content updates appropriately
   - Verification that state is preserved when navigating

6. **Complete Navigation Flows**
   - Testing entire user flows: Home → Projects → Project Detail → Back
   - Testing entire user flows: Home → Services → Service Detail → Back

## Test Structure

The tests are implemented in a single file `__tests__/integration/Navigation.test.tsx`. The structure includes:

1. **Mock Setup**
   - Mock Next.js router functionality
   - Mock the useCursor hook
   - Mock Framer Motion for animation testing

2. **Test Component**
   - An `AppWithNavigation` component that simulates the real application
   - Includes main navigation, page content, and browser controls

3. **Test Cases**
   - Individual test cases for specific navigation scenarios
   - Grouped by navigation pattern (main navigation, detail pages, etc.)

## Implementation Details

### Test Component

The test file implements a custom `AppWithNavigation` component that simulates the real application's navigation behavior:

```tsx
function AppWithNavigation() {
  const [activeRoute, setActiveRoute] = React.useState('/');
  
  // Navigation methods
  const navigateTo = (path) => { ... };
  const handleBack = () => { ... };
  const handleForward = () => { ... };
  
  return (
    <div>
      {/* Navigation Header */}
      <header>...</header>
      
      {/* Page Content */}
      <main>
        {activeRoute === '/' && <HomePageContent />}
        {activeRoute === '/work' && <ProjectsPageContent />}
        {/* Other routes */}
      </main>
      
      {/* Browser Controls */}
      <div>...</div>
    </div>
  );
}
```

### Mock Router

The test mocks Next.js router functionality to test navigation without a browser:

```tsx
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
let mockPathname = '/';
let mockAsPath = '/';
let mockQuery = {};

jest.mock('next/navigation', () => ({ ... }));
```

### Test Cases

Key test cases include:

1. **Basic Navigation**

```tsx
it('navigates between main sections (Home, Projects, Services)', async () => {
  render(<AppWithNavigation />);
  
  // Navigate to Projects
  fireEvent.click(screen.getByTestId('nav-projects'));
  
  await waitFor(() => {
    expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    expect(screen.getByTestId('nav-projects')).toHaveClass('active');
  });
  
  // More navigation tests...
});
```

2. **Detail Page Navigation**

```tsx
it('navigates to detail pages and back to listing pages', async () => {
  render(<AppWithNavigation />);
  
  // Navigate to Projects page, then to a project detail
  fireEvent.click(screen.getByTestId('nav-projects'));
  await waitFor(() => { ... });
  
  fireEvent.click(screen.getByTestId('project-1'));
  await waitFor(() => { ... });
  
  // Navigate back
  fireEvent.click(screen.getByTestId('back-to-projects'));
  await waitFor(() => { ... });
});
```

3. **URL Updates**

```tsx
it('updates URLs during navigation', async () => {
  render(<AppWithNavigation />);
  
  // Navigate and verify URL changes
  fireEvent.click(screen.getByTestId('nav-projects'));
  
  await waitFor(() => {
    expect(mockPathname).toBe('/work');
    expect(mockPush).toHaveBeenCalledWith('/work');
  });
  
  // More URL tests...
});
```

4. **Complete Navigation Flows**

```tsx
it('handles the complete navigation flow path: Home → Projects → Project Detail → Back', async () => {
  render(<AppWithNavigation />);
  
  // Complete flow testing...
});
```

## Running the Tests

To run the navigation integration tests:

```bash
# Run all integration tests
npm test -- --testPathPattern=integration

# Run only navigation tests
npm test -- --testPathPattern=integration/Navigation
```

## Test Limitations

1. **Browser Simulation**
   - These tests simulate browser navigation using mocks
   - For actual browser testing, see the Cypress end-to-end tests

2. **Animation Testing**
   - The tests verify that animations don't cause errors
   - Actual animation behavior is tested in the Animation tests

3. **History State**
   - The tests use a simplified history model
   - Complete history behavior is tested in end-to-end tests

## Related Test Documentation

1. [Navigation End-to-End Tests](./navigation-e2e-tests.md) - End-to-end tests using Cypress
2. [Animation Integration Tests](./animation-integration-tests.md) - Tests for animations during navigation
3. [Data Flow Integration Tests](./data-flow-integration-tests.md) - Tests for data persistence during navigation 