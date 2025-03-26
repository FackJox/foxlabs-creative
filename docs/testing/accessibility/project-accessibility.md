# Project Accessibility Testing Documentation

This document outlines the accessibility testing procedures for the project components in the FoxLabs//Creative portfolio website.

## Overview

The accessibility tests ensure that the Projects section of the portfolio website is accessible to all users, including those who rely on assistive technologies. These tests are critical for maintaining WCAG 2.1 AA compliance across the application.

## Test Coverage

The project accessibility tests cover the following areas:

1. **Project List Accessibility**
   - Proper heading hierarchy
   - ARIA labels and descriptions
   - Keyboard navigation
   - Focus management

2. **Project Detail Accessibility**
   - Heading structure
   - ARIA landmarks
   - Image descriptions
   - Dynamic content announcements
   - Reduced motion preferences
   - Form controls
   - Error handling

## Implementation Details

The accessibility tests are implemented using Cypress and include specific assertions for each accessibility requirement. Custom Cypress commands have been added to support these tests:

- `tab()` - A custom command to simulate keyboard tab navigation
- `checkA11y()` - A basic accessibility checking command

## Test File

The tests are located in:
```
cypress/e2e/project-accessibility.cy.ts
```

## Test Descriptions

### Project List Accessibility

#### should have proper heading hierarchy
This test ensures that the page has a proper heading structure with appropriate heading levels. It verifies that:
- There is at least one `h1` element on the page
- Project sections have appropriate `h2` elements

#### should have proper ARIA labels
This test checks that interactive elements have appropriate ARIA labels to provide context for screen reader users. It verifies:
- The project grid has an `aria-label` of "Projects grid"
- Each project card has an image with an `alt` attribute
- Each project title has an `aria-label` attribute

#### should be keyboard navigable
This test ensures that the project list can be navigated using only the keyboard. It verifies:
- Project cards can be focused using the Tab key
- Pressing Enter on a focused project card opens the project detail
- The project detail can be closed using the Escape key

#### should have proper focus management
This test verifies that focus is properly managed when opening modal dialogs. It checks:
- When a project card is clicked, focus moves to the project detail modal
- Focus is trapped within the modal while it's open

### Project Detail Accessibility

#### should have proper heading structure
This test verifies that the project detail page has a proper heading structure. It checks:
- There is an `h1` element for the project title
- Section headings are properly structured with `h2` elements

#### should have proper ARIA landmarks
This test ensures that ARIA landmarks are used to define page regions. It verifies:
- The main content has a `main` landmark
- Navigation elements are within a `nav` landmark
- The project gallery has a proper `region` role with an `aria-label`

#### should have proper image descriptions
This test checks that all images have appropriate alternative text. It verifies:
- The main project image has an `alt` attribute
- All gallery images have `alt` attributes that describe their content

#### should announce dynamic content changes
This test ensures that dynamic content changes are announced to screen reader users. It checks:
- Gallery navigation actions announce status changes
- Status messages have appropriate ARIA attributes

#### should respect reduced motion preferences
This test verifies that the application respects user preferences for reduced motion. It checks:
- Page transitions have a `data-reduce-motion` attribute
- Gallery transitions respect reduced motion preferences

#### should have proper form controls
This test ensures that form controls have proper labels and descriptions. It verifies:
- Category filter buttons have `aria-label` attributes

#### should have proper error handling
This test checks that error states are properly communicated to screen reader users. It verifies:
- Error messages have `role="alert"` and `aria-live="polite"` attributes
- Error states are properly triggered and announced

## Running Tests

To run the project accessibility tests:

```bash
npx cypress run --spec "cypress/e2e/project-accessibility.cy.ts"
```

## Best Practices

1. **Focus Management**: Always ensure that focus is properly managed when opening/closing modals or transitioning between views.
2. **ARIA Attributes**: Use appropriate ARIA attributes to provide context and semantics for interactive elements.
3. **Keyboard Navigation**: Ensure all interactive elements can be accessed and activated using only the keyboard.
4. **Error Announcement**: Announce errors appropriately to users of screen readers.
5. **Reduced Motion**: Respect user preferences for reduced motion to prevent motion sickness.

## Recent Updates

### Custom Tab Command Implementation

To support keyboard navigation testing, we've implemented a custom Cypress `tab()` command that simulates pressing the Tab key:

```javascript
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  const tabKey = { keyCode: 9, which: 9 };
  
  if (subject) {
    return cy.wrap(subject).trigger('keydown', tabKey);
  }
  
  return cy.focused().trigger('keydown', tabKey);
});
```

### Basic Accessibility Checks

We've also implemented a basic `checkA11y()` command that performs fundamental accessibility checks:

```javascript
Cypress.Commands.add('checkA11y', (options = {}) => {
  cy.log('Running basic accessibility checks');
  
  // Check for alt text on images
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
  
  // Check for proper aria attributes on interactive elements
  cy.get('button, a[href], [role="button"]').each(($el) => {
    if (!$el.text().trim() && !$el.attr('aria-label')) {
      cy.wrap($el).should('have.attr', 'aria-label');
    }
  });
});
```

## Passing Test Results

All 11 accessibility tests are now passing, demonstrating the portfolio website's commitment to accessibility standards. The tests ensure that users with disabilities can effectively navigate and interact with the Projects section of the website.

## Troubleshooting

Common issues that may arise during accessibility testing include:

1. **Focus Management**: If focus is not properly managed, try using explicit `focus()` calls in your tests.
2. **Hidden Elements**: Elements that are visually hidden may cause test failures. Use `{ force: true }` when interacting with these elements.
3. **Animation Timing**: Animations may affect test timing. Use appropriate waits or disable animations during testing.
4. **Keyboard Navigation**: Custom components may not respond to standard keyboard events. Ensure they have appropriate keyboard handlers.

## Conclusion

The Project accessibility tests ensure that all users, regardless of ability, can effectively use the Projects section of the FoxLabs//Creative portfolio website. By maintaining and expanding these tests, we ensure that accessibility remains a core feature of the website. 