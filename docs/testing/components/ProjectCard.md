# ProjectCard Component Testing Documentation

## Overview

This document outlines the testing approach for the `ProjectCard` component, which is responsible for displaying project information in a card format across the portfolio website. The component includes project details such as title, category, year, image, and description (when in detailed mode).

## Component Functionality

The `ProjectCard` component has the following key behaviors:

1. Renders project information (title, category, year, image)
2. Handles optional detailed view with description
3. Changes cursor text to "VIEW" on hover
4. Provides animated transitions using Framer Motion
5. Maintains accessibility standards

## Test Strategy

The test suite for the `ProjectCard` component is structured around three main areas:

1. **Rendering with different data variations** - Tests that verify the component renders correctly with different data inputs
2. **Interaction behavior** - Tests that verify hover states and cursor text updates
3. **Accessibility compliance** - Tests that verify the component meets accessibility standards

## Test Cases

### Rendering with Different Data Variations

| Test Case | Description | Expected Outcome |
|-----------|-------------|------------------|
| Complete project data | Renders with a full set of project data | All project information is displayed correctly |
| Minimal project data | Renders with only required fields | Required fields are displayed, no errors for missing optional fields |
| Detailed mode | Renders with detailed prop set to true | Description is visible in the card |
| Non-detailed mode | Renders with detailed prop set to false | Description is not visible in the card |
| Missing image | Renders when project image is undefined | Fallback to placeholder image |

### Interaction Behavior

| Test Case | Description | Expected Outcome |
|-----------|-------------|------------------|
| Cursor text on hover | Changes cursor text when card is hovered | `setCursorText` is called with "VIEW" on hover |
| Cursor text on unhover | Clears cursor text when card is no longer hovered | `setCursorText` is called with "" on mouse leave |
| Animation index | Component animates with delay based on index prop | Component renders with animation attributes |

### Accessibility Compliance

| Test Case | Description | Expected Outcome |
|-----------|-------------|------------------|
| Accessibility violations | Check for accessibility issues | No accessibility violations found |
| Image alt text | Verify proper alt text for images | Image has appropriate alt text matching project title |
| ARIA attributes | Verify proper ARIA attributes | Project title has appropriate aria-label |

## Mocking Strategy

The test suite uses the following mocks:

1. **useCursor hook** - Mocked to test cursor text updates
2. **Framer Motion** - Mocked to prevent animation issues during testing
3. **next/navigation** - Mocked to test routing behavior

## Test Data

Test data is created using the mockDataFactory utilities:

1. `createMockProject()` - Creates a complete project with all fields
2. `createMinimalProject()` - Creates a project with only required fields

## Challenges and Solutions

1. **Framer Motion Animations** - Framer Motion components cause console warnings during testing. Solution: Mock the motion components while preserving basic functionality.

2. **Image Testing** - The Next.js Image component doesn't automatically include a data-testid attribute. Solution: Test images using alt text instead of testid attributes.

## Future Improvements

1. Add tests for actual navigation behavior when cards are clicked
2. Test animation behavior more thoroughly using animation testing libraries
3. Expand test coverage for different viewport sizes to test responsive behavior 