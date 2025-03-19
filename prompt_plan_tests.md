
# RAW/STUDIO Portfolio Website Testing Blueprint

This document outlines a comprehensive testing strategy for the RAW/STUDIO portfolio website, breaking it down into incremental steps with corresponding prompts for implementation.

## Overall Testing Architecture

The testing strategy will use:
- **Jest**: Core testing framework
- **React Testing Library**: For component testing
- **MSW (Mock Service Worker)**: For mocking API calls
- **Cypress**: For end-to-end testing
- **Testing Library User Event**: For simulating user interactions
- **jest-axe**: For accessibility testing
- **jest-coverage-badges**: For generating coverage reports

## Implementation Steps and Prompts

### Phase 1: Setup Testing Infrastructure

#### Step 1: Basic Jest and React Testing Library Setup

```
Create the initial testing infrastructure for the RAW/STUDIO portfolio website. Set up Jest with React Testing Library for a Next.js TypeScript project. This should include:

1. Install necessary dependencies (jest, @testing-library/react, @testing-library/jest-dom, jest-environment-jsdom)
2. Create jest.config.js file configured for Next.js/TypeScript
3. Set up jest.setup.js to import testing-library/jest-dom
4. Add test scripts to package.json
5. Create a simple example test to verify the setup is working
6. Add .gitignore entries for test coverage reports

Make sure the configuration supports TypeScript, CSS/SCSS modules, and handles Next.js-specific features like Image components.
```

#### Step 2: MSW Setup for API Mocking

```
Set up Mock Service Worker (MSW) to mock API responses for testing. For the RAW/STUDIO portfolio website, this will allow us to simulate data fetching without making actual API calls during tests.

1. Install MSW dependencies (msw)
2. Create a src/mocks directory with a server.ts file
3. Set up handlers for the main data endpoints, based on the data structure in lib/data.ts
4. Create a MSW setup file to be included in jest.setup.js
5. Add a simple test that verifies MSW can intercept and mock a data request
6. Update the jest configuration to ensure MSW is properly initialized during tests

The goal is to have a working MSW setup that can simulate the behavior of API calls to fetch projects, services, and team members data.
```

#### Step 3: Setup Cypress for E2E Testing

```
Set up Cypress for end-to-end testing of the RAW/STUDIO portfolio website. This will allow us to test full user journeys through the application.

1. Install Cypress and required dependencies
2. Create the initial Cypress configuration with TypeScript support
3. Set up Cypress directory structure (e2e, fixtures, support)
4. Configure Cypress to work with the Next.js development server
5. Add scripts to package.json for running Cypress tests
6. Create a simple example test that verifies Cypress can navigate to the homepage
7. Configure Cypress to generate reports that can be combined with Jest coverage

Ensure the setup supports testing critical user flows like navigating between pages, viewing projects, and interacting with the UI while maintaining the custom cursor behavior.
```

#### Step 4: Configure Testing for Framer Motion and Radix UI

```
Set up the testing infrastructure to properly handle Framer Motion animations and Radix UI components. This is essential for the RAW/STUDIO portfolio website that relies heavily on these libraries.

1. Create test utilities to mock Framer Motion's AnimatePresence and motion components
2. Set up jest mocks for Framer Motion to prevent animation-related test failures
3. Configure test environment to properly render and test Radix UI components
4. Create helper functions for testing animated components (checking if animations are triggered)
5. Set up utilities to test accessibility features of Radix UI components
6. Create a simple test file demonstrating testing a component with both animations and Radix UI elements

Make sure the tests can verify that animations and UI components behave correctly without being affected by animation timing issues during testing.
```

#### Step 5: Setup Coverage Reporting and Badges

```
Set up comprehensive test coverage reporting for the RAW/STUDIO portfolio website to track progress toward the 80% coverage goal.

1. Configure Jest to collect coverage information
2. Set up coverage thresholds in jest.config.js (aiming for 80% overall)
3. Install and configure jest-coverage-badges to generate coverage badges
4. Set up a GitHub workflow or similar CI process to run tests and update coverage badges
5. Create a coverage report script that combines Jest and Cypress coverage data
6. Add coverage reporting to the README.md file
7. Create an example test run that generates a coverage report

The coverage setup should track statement, branch, function, and line coverage separately and provide visual indicators of progress.
```

### Phase 2: Unit Testing Core Utilities and Hooks

#### Step 6: Test Data Utilities

```
Create unit tests for the data utility functions in the RAW/STUDIO portfolio website. These functions handle data transformation, filtering, and preparation for display.

1. Create test files for any utility functions that process the project, service, or team data
2. Write tests for functions that filter projects by category
3. Test utilities that format or transform data for display
4. Test data validation functions if they exist
5. Create mock data fixtures that mirror the structure in lib/data.ts but are simplified for testing
6. Ensure edge cases are covered (empty arrays, missing optional fields, etc.)

Focus on pure functions first, as they're easier to test with simple input/output assertions. The tests should verify that data is processed correctly before being passed to components.
```

#### Step 7: Test Custom Hooks

```
Create unit tests for custom React hooks used in the RAW/STUDIO portfolio website. These hooks likely handle state management, animations, cursor behavior, and other reusable logic.

1. Set up the testing-library/react-hooks package or use renderHook from testing-library/react
2. Create test files for each custom hook in the project
3. Test the useCustomCursor hook to ensure it properly manages cursor state and text
4. Test any animation hooks to verify they return the expected animation controls
5. Test hooks that manage component state, like filters or toggles
6. Test hooks that handle window or DOM events
7. Ensure each hook test covers initial state, state changes, and cleanup if applicable

For the cursor hook specifically, verify it properly updates cursor text on hover events and resets on mouse leave. Mock any browser APIs as needed.
```

#### Step 8: Test Common UI Components

```
Create unit tests for the common UI components used throughout the RAW/STUDIO portfolio website. Focus on the basic building blocks like buttons, cards, and layout elements.

1. Create test files for basic UI components in the components/ui directory
2. Test the Button component for correct rendering, click handlers, and accessibility
3. Test any Card components used for projects or services
4. Test layout components like containers, grids, and sections
5. Test typography components like headings and text elements
6. For each component, verify:
   - Correct rendering of children and props
   - Proper handling of events
   - Accessibility features
   - Style variants if applicable
   - Custom cursor behavior on hover/leave

Use snapshots sparingly and focus on testing component behavior and accessibility rather than exact styling.
```

#### Step 9: Test UI Component Interactions

```
Create unit tests for interactive UI components in the RAW/STUDIO portfolio website. Focus on components that have state changes or complex user interactions.

1. Create test files for interactive components like:
   - Navigation menus
   - Dropdowns or select components
   - Tabs or accordions
   - Modal dialogs
   - Filter components
2. For each component, test:
   - Initial state rendering
   - State changes after user interactions
   - Keyboard accessibility
   - Screen reader accessibility
   - Expected callbacks are triggered
3. Use Testing Library's userEvent to simulate realistic user interactions
4. Test focus management in components that manage focus (like modals)
5. Test that custom cursor text changes appropriately during interactions

Make sure to test both mouse and keyboard interactions to ensure accessibility compliance.
```

### Phase 3: Feature-Specific Unit Tests

#### Step 10: Test Project Components

```
Create unit tests for the project-related components in the RAW/STUDIO portfolio website. These components are responsible for displaying project information, galleries, and details.

1. Create test files for components that display projects:
   - ProjectCard
   - ProjectGrid or ProjectList
   - ProjectDetails
   - ProjectGallery
2. Test each component with various project data scenarios:
   - Projects with all fields
   - Projects with minimal required fields
   - Edge cases (very long text, many gallery images, etc.)
3. Test filtering functionality if present
4. Test navigation between project list and details
5. Verify correct display of project metadata (year, category, client)
6. Test gallery navigation and image display
7. Verify custom cursor behavior when interacting with projects

Use the mock project data created earlier to avoid test dependency on actual data.
```

#### Step 11: Test Service Components

```
Create unit tests for the service-related components in the RAW/STUDIO portfolio website. These components display information about services offered by the studio.

1. Create test files for components that display services:
   - ServiceCard
   - ServiceList
   - ServiceDetails
   - ServiceProcess
   - ServiceBenefits
2. Test each component with various service data scenarios:
   - Services with all optional fields
   - Services with minimal required fields
   - Edge cases (many process steps, long benefit lists)
3. Test any filtering or categorization of services
4. Verify process steps are correctly displayed in order
5. Test that benefits are properly listed
6. Test case study links if present
7. Verify cursor behavior on interactive elements

Make sure to test both the visual display and any interactive elements within service components.
```

#### Step 12: Test Team Components

```
Create unit tests for the team-related components in the RAW/STUDIO portfolio website. These components display information about team members.

1. Create test files for components that display team information:
   - TeamMemberCard
   - TeamGrid or TeamList
   - TeamMemberDetails
2. Test each component with various team member data scenarios:
   - Team members with all fields
   - Team members with minimal required fields
   - Edge cases (long biographies, multiple roles)
3. Test any filtering by role or department if present
4. Verify correct display of team member metadata (role, contact info)
5. Test social media links if present
6. Verify cursor behavior on interactive elements
7. Test any animations or hover effects

Ensure the components correctly display all team member information and handle interactions appropriately.
```

#### Step 13: Test Layout and Navigation Components

```
Create unit tests for the layout and navigation components in the RAW/STUDIO portfolio website. These components provide the structure and navigation for the entire site.

1. Create test files for layout components:
   - Header
   - Footer
   - Navigation
   - Layout wrapper components
   - Sidebar if present
2. Test correct rendering of navigation links
3. Test mobile menu functionality if present
4. Test that active states are correctly applied to current page links
5. Test any dropdown or submenu behavior
6. Verify logo and branding elements are displayed
7. Test responsive behavior at different viewport sizes
8. Test that navigation triggers appropriate cursor text changes

Make sure to test both desktop and mobile navigation patterns, including any hamburger menus or mobile-specific UI.
```

### Phase 4: Integration Testing

#### Step 14: Test Page Components

```
Create integration tests for the page components in the RAW/STUDIO portfolio website. These tests will verify that the pages correctly integrate multiple components and display data.

1. Create test files for each main page component:
   - HomePage
   - ProjectsPage
   - ProjectDetailPage
   - ServicesPage
   - ServiceDetailPage
   - TeamPage
   - ContactPage (if present)
2. For each page, test:
   - Correct rendering of all sections and child components
   - Data fetching and display
   - Page navigation functionality
   - Any page-specific interactions
3. Use MSW to mock API responses for data
4. Test any filtering or search functionality
5. Test SEO elements like meta tags and heading structure
6. Verify that pages respond correctly to URL parameters

These tests should verify that components work together correctly within the context of a page.
```

#### Step 15: Test Data Flow and State Management

```
Create integration tests that verify the data flow and state management in the RAW/STUDIO portfolio website. These tests will ensure that data is correctly passed between components and that state is managed properly.

1. Create test files for component hierarchies that share state:
   - Project filters and project display
   - Service categories and service display
   - Any components that use context providers
2. Test that state changes in one component affect other components correctly
3. Test that filtering in one component updates the display in another
4. Test that URL parameters correctly update component state
5. Test navigation between list and detail views, ensuring data consistency
6. Test any global state management (context, Redux, etc.)
7. Verify that state is preserved when expected during navigation

These tests should focus on how components communicate and share data rather than individual component functionality.
```

#### Step 16: Test Animations and Transitions

```
Create integration tests for animations and transitions in the RAW/STUDIO portfolio website. These tests will verify that Framer Motion animations work correctly in component interactions.

1. Create test files for components with significant animations:
   - Page transitions
   - Modal open/close animations
   - List item entrance animations
   - Hover or interaction animations
2. Test that animations are triggered by the correct events
3. Test that AnimatePresence works correctly for elements entering/exiting
4. Test animation variants for different states
5. Verify that reduced motion preferences are respected
6. Test that animations don't interfere with functionality
7. Test that animations work in different browsers

Use the animation testing utilities created earlier to verify animation states and properties.
```

#### Step 17: Test Custom Cursor Integration

```
Create integration tests specifically for the custom cursor functionality in the RAW/STUDIO portfolio website. This is a key feature mentioned in the spec.

1. Create a test file for the custom cursor behavior across components
2. Test that the cursor text changes on hover of interactive elements
3. Test that cursor text is cleared on mouse leave
4. Test cursor behavior with different types of elements (buttons, links, cards)
5. Test cursor state transitions and animations
6. Verify cursor behavior in different viewport sizes
7. Test that cursor works correctly with nested interactive elements
8. Verify that focus states are visually consistent with hover states

These tests should ensure the custom cursor provides consistent feedback across the entire application.
```

### Phase 5: End-to-End Testing

#### Step 18: Basic Navigation E2E Tests

```
Create basic end-to-end tests using Cypress to verify navigation flows in the RAW/STUDIO portfolio website. These tests will simulate real user journeys through the site.

1. Create Cypress test files for basic navigation:
   - Home page load and verification
   - Navigation to Projects page
   - Navigation to Services page
   - Navigation to Team page
   - Navigation to Contact page (if present)
2. Verify that the correct content is displayed on each page
3. Test that navigation elements work correctly
4. Test that page transitions complete correctly
5. Verify URL changes reflect the current page
6. Test browser back/forward navigation
7. Test that the page logo returns to the home page

These tests should confirm that users can navigate through the entire site without errors.
```

#### Step 19: Project Interaction E2E Tests

```
Create end-to-end tests using Cypress to verify project-related user flows in the RAW/STUDIO portfolio website. These tests will simulate users browsing and interacting with projects.

1. Create Cypress test files for project interactions:
   - Browsing the project list
   - Filtering projects by category
   - Viewing project details
   - Navigating project galleries
   - Testing any external project links
2. Verify that projects display correctly in lists and detail views
3. Test that filtering works as expected
4. Test navigation between project list and detail pages
5. Verify that project details display all expected information
6. Test gallery navigation if present
7. Verify any animations or transitions complete correctly

These tests should verify the primary user journey of exploring projects works correctly.
```

#### Step 20: Service and Team E2E Tests

```
Create end-to-end tests using Cypress to verify service and team-related user flows in the RAW/STUDIO portfolio website. These tests will simulate users exploring services and team information.

1. Create Cypress test files for service and team interactions:
   - Browsing services list
   - Viewing service details
   - Exploring service process steps
   - Viewing service case studies
   - Browsing team members
   - Viewing team member details
2. Verify that services display correctly in lists and detail views
3. Test that service processes and benefits are displayed correctly
4. Test navigation between service list and detail pages
5. Verify that team information is displayed correctly
6. Test any filtering or categorization of team members
7. Test any contact functionality related to team members

These tests should verify that users can learn about services and team members without issues.
```

#### Step 21: Form Submission and Contact E2E Tests

```
Create end-to-end tests using Cypress to verify form submission and contact functionality in the RAW/STUDIO portfolio website. These tests will simulate users contacting the studio.

1. Create Cypress test files for contact functionality:
   - Navigating to contact forms
   - Filling out contact information
   - Form validation
   - Form submission
   - Success/error messages
2. Test form validation for required fields
3. Test form validation for field formats (email, phone)
4. Test submission with valid data
5. Test error handling for invalid submissions
6. Verify success messages after submission
7. Test any file upload functionality if present
8. Verify responsive behavior of forms on different devices

Mock the actual form submission API to avoid sending test data to real endpoints while still testing the full submission flow.
```

#### Step 22: Accessibility and Performance E2E Tests

```
Create end-to-end tests using Cypress to verify accessibility and performance aspects of the RAW/STUDIO portfolio website. These tests will ensure the site is accessible to all users and performs well.

1. Install and configure Cypress accessibility testing plugins (cypress-axe)
2. Create Cypress test files for accessibility:
   - Home page accessibility
   - Project pages accessibility
   - Service pages accessibility
   - Team pages accessibility
   - Contact form accessibility
3. Test keyboard navigation throughout the site
4. Verify proper heading structure and ARIA attributes
5. Test screen reader compatibility
6. Test color contrast compliance
7. Test focus management in interactive components
8. Verify the site works with different viewport sizes
9. Add performance testing to measure load times and core web vitals

These tests should verify that the site meets WCAG 2.1 AA standards and performs well across devices.
```

### Phase 6: Refinement and Integration

#### Step 23: Test Coverage Analysis and Gap Filling

```
Analyze the current test coverage of the RAW/STUDIO portfolio website and create targeted tests to fill any gaps. This step aims to reach the 80% coverage goal.

1. Run a full coverage report combining all existing tests
2. Identify components, functions, or code paths with low coverage
3. Create additional tests specifically targeting uncovered code
4. Focus on edge cases and error conditions that might be missed
5. Add tests for any uncovered conditional branches
6. Create tests for error handling paths
7. Verify that all custom hooks have complete coverage
8. Review and update existing tests that could be more comprehensive

The goal is to systematically identify and address coverage gaps to reach at least 80% coverage across all metrics.
```

#### Step 24: Test Maintenance and Documentation

```
Create documentation and maintenance procedures for the RAW/STUDIO portfolio website test suite. This ensures the tests remain valuable as the codebase evolves.

1. Create a TESTING.md file documenting:
   - Testing architecture and tools
   - How to run different types of tests
   - How to interpret test results and coverage
   - Guidelines for writing new tests
   - Common testing patterns and utilities
2. Update the README.md with testing badges and basic information
3. Add inline documentation to complex test files
4. Create testing patterns file with examples of common test scenarios
5. Document mock data and how to extend it
6. Create guidelines for testing new components
7. Document any known testing limitations or workarounds

Good documentation ensures that other developers can maintain and extend the tests as the application evolves.
```

#### Step 25: CI/CD Integration and Automation

```
Set up continuous integration and delivery processes for the RAW/STUDIO portfolio website tests. This ensures tests are run automatically and consistently.

1. Create or update GitHub Actions workflows (or similar CI system) to:
   - Run unit and integration tests on every pull request
   - Run E2E tests on main branch merges
   - Generate and publish coverage reports
   - Enforce minimum coverage thresholds
2. Configure status checks to prevent merging PRs that break tests
3. Set up test splitting for faster CI runs
4. Configure caching of test dependencies
5. Set up notifications for test failures
6. Create a scheduled workflow to run full test suite regularly
7. Document the CI/CD process in the repository

Automation ensures that tests are consistently run and that coverage doesn't decrease over time.
```

