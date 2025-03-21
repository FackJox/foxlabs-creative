# Custom Cursor Component Testing

This document outlines the testing strategy and implementation for the custom cursor functionality in the RAW/STUDIO portfolio website.

## Component Overview

The custom cursor implementation consists of:

1. **CursorProvider**: A context provider that manages cursor state and position
2. **useCursor hook**: A custom hook that provides access to cursor state and functions
3. **CustomCursor component**: The visual representation of the cursor

## Test Files

The following test files have been created:

- `__tests__/components/cursor/CursorProvider.test.tsx` - Tests for the CursorProvider component
- `__tests__/hooks/useCursor.test.ts` - Tests for the useCursor hook
- `__tests__/components/cursor/CustomCursor.test.tsx` - Tests for the CustomCursor component
- `__tests__/components/cursor/CursorInteraction.test.tsx` - Tests for cursor interaction with UI components
- `cypress/e2e/cursor-visibility.cy.ts` - End-to-end tests for cursor visibility

## Testing Strategy

Our testing approach follows these principles:

1. **Modular Testing**: Testing each part of the cursor system in isolation
2. **Context Testing**: Ensuring context provider and consumer work correctly together
3. **Accessibility Focus**: Verifying the cursor doesn't interfere with accessibility features
4. **Event Handling**: Testing event listeners and mouse movement handling
5. **Visual Behavior**: Testing cursor appearance changes based on state

## Bug Fixes

### Cursor Visibility Bug

**Issue**: The cursor trail and dots were not visible unless hovering over elements with `setCursorText`.

**Root cause**: 
- The main cursor, cursor trail, and cursor dots all had visibility tied to the cursor text state
- Only the main cursor should change visibility based on cursor text, not the trail or dots

**Solution**:
1. Added explicit comments in the CustomCursor component to indicate that cursor trail and dots should always be visible
2. Added data attributes to all cursor parts for better testing
3. Added data-testid attributes to ensure Cypress tests can find the cursor elements
4. Updated the useCursor hook to properly update the data-cursor-text attribute on the body element
5. Improved the tests to verify cursor visibility in different states

### Testing Improvements

1. **Added Data Attributes**:
   - `data-testid="cursor"` for the main cursor
   - `data-testid="cursor-trail"` for the cursor trail
   - `data-testid="cursor-dot"` for the cursor dots
   - `data-state="active|inactive"` to indicate cursor text state

2. **Enhanced Cypress Commands**:
   - `checkCustomCursor()` - Checks if the custom cursor exists
   - `setCursorText(text)` - Sets the cursor text
   - `checkCursorText(text)` - Checks if cursor text matches expected value
   - `hoverAndCheckCursor(text)` - Tests hover behavior with cursor text

## Test Implementation

### CustomCursor Component Tests

Tests that verify the CustomCursor component renders correctly and changes appearance based on cursor text:

```tsx
describe('CustomCursor Component', () => {
  it('should render cursor trail and dots when cursor text is empty', () => {
    render(
      <CursorProvider>
        <CustomCursor />
      </CursorProvider>
    );
    
    // Main cursor should exist but be invisible when there's no cursor text
    const mainCursor = document.querySelector('[data-testid="cursor"]');
    expect(mainCursor).toBeInTheDocument();
    
    // Check that cursor trail exists
    const cursorTrail = document.querySelector('[data-testid="cursor-trail"]');
    expect(cursorTrail).toBeInTheDocument();
    
    // Check that cursor dots exist (should be 5)
    const cursorDots = document.querySelectorAll('[data-testid="cursor-dot"]');
    expect(cursorDots.length).toBe(5);
  });
  
  it('should show the main cursor when cursor text is provided', () => {
    // Override the mock to return cursor text
    jest.spyOn(require('@/hooks/use-cursor'), 'useCursor').mockImplementation(() => ({
      cursorPosition: { x: 100, y: 100 },
      cursorText: 'VIEW',
      setCursorText: jest.fn(),
    }));
    
    render(
      <CursorProvider>
        <CustomCursor />
      </CursorProvider>
    );
    
    // Main cursor should be visible with opacity-100 class
    const mainCursor = document.querySelector('.opacity-100');
    expect(mainCursor).toBeInTheDocument();
    expect(mainCursor).toHaveTextContent('VIEW');
  });
});
```

### Cypress Tests

End-to-end tests that verify cursor visibility and behavior in the browser:

```ts
describe('Cursor Visibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show cursor trail and dots at all times', () => {
    // Cursor trail should be visible
    cy.get('[data-testid="cursor-trail"]').should('be.visible');
    
    // Cursor dots should be visible
    cy.get('[data-testid="cursor-dot"]').should('have.length', 5).each(($dot) => {
      cy.wrap($dot).should('be.visible');
    });
  });

  it('should show main cursor only when hovering interactive elements', () => {
    // Initially cursor should not be visible (opacity-0)
    cy.get('[data-testid="cursor"]').should('exist');
    
    // Hover over a button or link
    cy.get('a').first().trigger('mouseenter');
    
    // Main cursor should now be visible (opacity-100)
    cy.get('[data-testid="cursor"]').should('have.class', 'opacity-100');
    
    // Move away from the link
    cy.get('body').trigger('mousemove', { clientX: 100, clientY: 100 });
    
    // Main cursor should be invisible again
    cy.get('[data-testid="cursor"]').should('not.have.class', 'opacity-100');
  });
});
```

## Conclusion

The custom cursor implementation now correctly displays the cursor trail and dots at all times, with the main cursor only appearing when hovering over interactive elements. Testing has been enhanced to verify this behavior and ensure it remains consistent across changes. 