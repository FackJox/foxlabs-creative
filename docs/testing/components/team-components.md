# RAW/STUDIO Portfolio Website - Team Component Tests

This document provides details about unit tests for team-related components in the RAW/STUDIO portfolio website.

## 1. Team Component Overview

The test suite for team-related components covers the `TeamMember` component and the team section of the About page. These components are responsible for displaying information about team members.

## 2. Test Files

The test suite consists of the following files:

- `__tests__/core/TeamMember.test.tsx`: Tests for the core TeamMember component
- `__tests__/core/TeamMemberEdgeCases.test.tsx`: Tests for edge cases in the TeamMember component
- `__tests__/pages/AboutPage.test.tsx`: Tests for the team section in the About page
- `__tests__/pages/AboutPageEmptyTeam.test.tsx`: Tests for the About page when no team members exist

## 3. TeamMember Component Tests

### 3.1 Basic Functionality Tests

The `TeamMember.test.tsx` file contains tests for the basic functionality of the TeamMember component:

- **Rendering**: Tests that the component renders the team member's name, role, and image correctly.
- **Animation Props**: Tests that the component accepts and processes the index prop correctly for animations.
- **Image Handling**: Tests that the component displays a placeholder image when no image is provided.
- **Cursor Behavior**: Tests that the component updates the cursor text on hover and clears it on mouse leave.

### 3.2 Edge Case Tests

The `TeamMemberEdgeCases.test.tsx` file contains tests for various edge cases:

- **Long Names**: Tests that the component can handle team members with very long names.
- **Long Roles**: Tests that the component can handle team members with very long role titles.
- **Missing Images**: Tests that the component handles missing images gracefully by displaying a placeholder.
- **Broken Image URLs**: Tests that the component handles broken image URLs.
- **Index Values**: Tests that the component handles negative and very large index values for animation delays.

## 4. About Page Team Section Tests

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

## 5. Mock Strategy

The tests use the following mocking strategy:

- **Data**: Team member data is mocked using `mockTeamMembers` from the fixtures.
- **Components**: Header, Footer, and ContactSection components are mocked to focus testing on the team section.
- **Animations**: Framer Motion is mocked to avoid animation-related complexities in testing.
- **Cursor Behavior**: The useCursor hook is mocked to verify cursor text updates.
- **Images**: Next.js Image component is mocked to simplify image testing.

## 6. Testing Coverage

The tests aim to provide comprehensive coverage of the team-related components, including:

- Basic rendering and display
- Responsive behavior
- Animations and transitions
- User interactions (hover effects, cursor behavior)
- Edge cases and error handling

## 7. Running Team Component Tests

To run the tests specifically for team components:

```bash
npm test -- --testPathPattern=TeamMember
npm test -- --testPathPattern=AboutPage
```

To run tests for the edge case of an empty team:

```bash
npm test -- --testPathPattern=AboutPageEmptyTeam
```

## 8. Accessibility Testing

The team component tests include basic accessibility checks:

- Proper alt text for images
- Semantic HTML structure
- Keyboard navigation

For more comprehensive accessibility testing, additional tests using tools like jest-axe are recommended.

## 9. Future Improvements

Potential future improvements to the test suite:

- Add more comprehensive accessibility tests
- Test for specific animation parameters and timing
- Test for specific responsive behavior at different viewport sizes
- Add visual regression tests for the team section 