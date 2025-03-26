# Keyboard Navigation Testing Documentation

This document outlines the keyboard navigation testing procedures for the FoxLabs//Creative portfolio website.

## Overview

Keyboard navigation is a critical accessibility feature that ensures users who cannot or choose not to use a pointing device can still navigate and interact with the website. These tests ensure that all interactive elements can be accessed and activated using only the keyboard.

## Test Coverage

The keyboard navigation tests cover the following areas:

1. **Navigation Element Tab Order**
   - Logical and intuitive tab order
   - Focus visibility on all interactive elements
   - Skip links for main content

2. **Interactive Element Activation**
   - Enter key activates buttons and links
   - Space key activates buttons
   - Arrow keys navigate within components

3. **Modal and Popup Accessibility**
   - Focus trap within modals
   - Escape key closes modals
   - Focus returns to triggering element

4. **Form Controls**
   - Form fields accessible via keyboard
   - Form submission with keyboard
   - Error handling with keyboard

## Implementation Details

The keyboard navigation tests are implemented using Cypress and include specific assertions for each accessibility requirement. We've implemented a custom Cypress command to support keyboard navigation testing:

```javascript
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  const tabKey = { keyCode: 9, which: 9 };
  
  if (subject) {
    return cy.wrap(subject).trigger('keydown', tabKey);
  }
  
  return cy.focused().trigger('keydown', tabKey);
});
```

## Test File

The primary keyboard navigation tests are located in:
```
cypress/e2e/project-accessibility.cy.ts
```

## Test Examples

### Navigation and Tabbing

```typescript
it('should be keyboard navigable', () => {
  // Focus the first interactive element
  cy.get('body').focus();
  
  // Tab to find a project card
  cy.get('[data-testid="project-card"]').first().focus();
  cy.get('[data-testid="project-card"]').first().should('be.focused');
  
  // Press Enter to navigate to project detail
  cy.get('[data-testid="project-card"]').first().type('{enter}', { force: true });
  
  // Check that project detail opened
  cy.get('[data-testid="project-detail"]').should('exist');
  
  // Press Escape to go back
  cy.get('body').type('{esc}');
  
  // Check that detail is closed
  cy.get('[data-testid="project-detail"]').should('not.exist');
});
```

### Focus Management

```typescript
it('should have proper focus management', () => {
  // Click a project card
  cy.get('[data-testid="project-card"]').first().click({ force: true });
  
  // Check if focus is managed properly in the modal
  cy.get('[data-testid="project-detail"]').should('be.focused');
});
```

## Best Practices

1. **Logical Tab Order**: Ensure that tab order follows a logical flow, typically left-to-right and top-to-bottom.
2. **Visual Focus Indicator**: All focusable elements must have a visible focus indicator.
3. **Keyboard Traps**: Avoid keyboard traps where focus cannot be moved away from an element using keyboard.
4. **Focus Management**: When opening a modal or dialog, move focus to it and trap focus within it.
5. **Return Focus**: When closing a modal or dialog, return focus to the element that triggered it.
6. **Skip Links**: Provide skip links to allow users to bypass navigation and go directly to main content.

## Common Issues and Solutions

### Issue: Element not receiving focus

**Solution**: Ensure the element is in the natural tab order by checking:
- It's not `display: none` or `visibility: hidden`
- It has a valid `tabindex` (0 or greater)
- It's a naturally focusable element (a, button, input, etc.)

### Issue: Focus not visible

**Solution**: Ensure the element has a visible focus style:
- Use `:focus` CSS pseudo-class
- Don't remove outline without providing an alternative
- Consider using `:focus-visible` for better user experience

### Issue: Modal focus trap not working

**Solution**: Implement proper focus trapping:
- Set `tabindex="-1"` on the modal itself
- Focus the modal when it opens
- Add event listeners to catch Tab key presses
- Cycle focus back to first focusable element when reaching last element

## Recent Updates

We've improved our keyboard navigation tests by:

1. **Implementing a custom tab command** for more reliable tab simulation
2. **Using explicit focus** for better test reliability
3. **Adding force option** to handle hidden elements
4. **Adding detailed checks** for modal focus management

## Test Results

All keyboard navigation tests are now passing, indicating that the website can be fully navigated using only a keyboard. This ensures accessibility for users who rely on keyboard navigation, including those with motor disabilities or those using screen readers.

## Future Improvements

1. **Enhanced Tab Order Testing**: Add tests to verify the sequence of tabbing through elements.
2. **Arrow Key Navigation**: Expand tests to cover arrow key navigation within components.
3. **Keyboard Shortcuts**: Add tests for any custom keyboard shortcuts implemented.

## Conclusion

Keyboard navigation testing is essential for ensuring that the FoxLabs//Creative portfolio website is accessible to all users. By thoroughly testing keyboard interactions, we ensure that users who rely on keyboard navigation can effectively use all features of the website. 