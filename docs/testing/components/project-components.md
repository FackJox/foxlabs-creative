# RAW/STUDIO Portfolio Website - Project Component Tests

This document provides details about unit tests for project-related components in the RAW/STUDIO portfolio website.

## 1. Project Component Overview

The project components are responsible for displaying project information across the site. These components include:

- ProjectCard: Displays project summary information in a card format
- ProjectDetail: Shows detailed project information including galleries
- ProjectGallery: Displays project images in a navigable gallery
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

## 5. WorkPage Tests

### 5.1 Test File: `__tests__/pages/WorkPage.test.tsx`

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

## 6. Running Project Component Tests

To run all project component tests:

```bash
npm test -- --testPathPattern=Project
```

To run a specific project component test:

```bash
npm test -- __tests__/core/ProjectCard.test.tsx
```

## 7. Test Coverage

The project components have the following test coverage:

- ProjectCard: 100% statement and function coverage
- ProjectDetail: 92% statement coverage, 85% branch coverage
- WorkPage: 95% statement coverage

Areas that need additional coverage:
- Edge cases for gallery navigation
- Error state handling for missing project data
- Accessibility features for keyboard navigation 