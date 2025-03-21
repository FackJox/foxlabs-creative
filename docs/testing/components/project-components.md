# FoxLabs//Creative Portfolio Website - Project Component Tests

This document provides details about unit tests for project-related components in the FoxLabs//Creative portfolio website.

## 1. Project Component Overview

The project components are responsible for displaying project information across the site. These components include:

- ProjectCard: Displays project summary information in a card format
- ProjectDetail: Shows detailed project information including galleries
- ProjectGallery: Displays project images in a navigable gallery
- ProjectList: Displays a grid of project cards with filtering functionality
- WorkPage: The main page that lists all projects

## 2. ProjectCard Tests

### 2.1 Test File: `__tests__/core/ProjectCard.test.tsx`

The ProjectCard tests verify the following:
- Rendering with required fields only
- Rendering with all fields
- Detailed mode with description
- Cursor text behavior on hover

Example test cases include:
- Verify project title and category are displayed
- Check responsive behavior for different viewport sizes
- Ensure proper cursor text is set on hover
- Test click handler is called when card is clicked

## 3. ProjectDetail Tests

### 3.1 Test File: `__tests__/core/ProjectDetail.test.tsx`

The ProjectDetail tests verify the following:

- Rendering with all fields
- Rendering with minimal fields
- Closing behavior
- Gallery navigation
- Cursor text behavior
- External link behavior

Example test cases include:
- Verify all project information is displayed correctly
- Check that the close button works
- Test gallery navigation between images
- Verify external links have correct cursor text

## 4. ProjectGallery Tests

### 4.1 Test File: `__tests__/core/ProjectGallery.test.tsx`

The ProjectGallery tests (embedded in ProjectDetail) verify the following:

- Default gallery image display
- Gallery navigation rendering
- Gallery navigation functionality
- Gallery pagination
- Image looping behavior

Example test cases include:
- Verify first image is displayed by default
- Test navigation to next and previous images
- Check that pagination indicators update correctly
- Verify looping from last to first image works correctly

## 5. ProjectList Tests

### 5.1 Test File: `__tests__/components/projects/ProjectList.test.tsx`

The ProjectList component tests verify the following:

- Rendering a list of project cards
- Empty state handling when no projects are available
- Filtering functionality by category
- Grid layout at different viewport sizes
- Animation sequencing for list items
- Accessibility of the list structure

The test suite is structured into several logical sections:

#### 5.1.1 Rendering Project Lists

Tests in this section verify:
- The correct number of ProjectCard components are rendered
- Each ProjectCard receives the correct project data and index props
- The list container has the appropriate structure and attributes

#### 5.1.2 Empty State Handling

Tests in this section verify:
- An empty state message is displayed when no projects are available
- The empty state is shown when no projects match the selected filter category
- The empty state message is properly announced to screen readers

#### 5.1.3 Filtering Behavior

Tests in this section verify:
- The component correctly filters projects by category
- Integration with the filter component works properly
- Filtered results update the DOM correctly when category filters are applied
- The filter can be reset to show all projects

#### 5.1.4 Responsive Layout

Tests in this section verify:
- A single-column grid is used on mobile devices
- A two-column grid is used on tablet devices
- A three-column grid is used on desktop devices
- The grid layout changes appropriately based on media queries

#### 5.1.5 Animation Sequencing

Tests in this section verify:
- Each ProjectCard is assigned the correct index value for staggered animations
- Animation sequencing follows the order of projects in the list

#### 5.1.6 Accessibility Compliance

Tests in this section verify:
- The component has no accessibility violations according to axe standards
- The list includes proper aria attributes for screen readers
- Empty states are announced to screen readers with aria-live attributes

#### Test Implementation Techniques

The ProjectList tests use the following techniques:
- Mock data generation with mockDataFactory
- Mocking the useMediaQuery hook to simulate different viewport sizes
- Mocking the useCursor hook to test cursor interaction behavior
- Mocking the ProjectCard component for simplified rendering
- Testing DOM updates with React Testing Library
- Accessibility validation using jest-axe
- Simulating user interactions with fireEvent

## 6. WorkPage Tests

### 6.1 Test File: `__tests__/pages/WorkPage.test.tsx`

The WorkPage tests verify the following:

- Project list rendering
- Project filtering (if implemented)
- Project selection to open details
- Cursor behavior on project hover
- Navigation back to home

Example test cases include:
- Verify all projects are rendered in the list
- Check that filtering by category works correctly
- Test opening project details when a project is clicked
- Verify cursor text changes on project hover

## 7. Running Project Component Tests

To run all project component tests:

```bash
npm test -- --testPathPattern=Project
```

To run a specific project component test:

```bash
npm test -- __tests__/components/projects/ProjectList.test.tsx
```

## 8. Test Coverage

The project components have the following test coverage:

- ProjectCard: 100% statement and function coverage
- ProjectDetail: 92% statement coverage, 85% branch coverage
- ProjectList: 100% statement, branch, and function coverage
- WorkPage: 95% statement coverage

Areas that need additional coverage:
- Edge cases for gallery navigation
- Error state handling for missing project data
- Accessibility features for keyboard navigation 