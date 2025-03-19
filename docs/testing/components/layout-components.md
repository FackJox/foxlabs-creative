# RAW/STUDIO Portfolio Website - Layout Components Testing

This document outlines the testing approach for layout components in the RAW/STUDIO portfolio website.

## Components Tested

1. **Header** (`components/layout/header.tsx`)
   - Main navigation bar
   - Mobile menu toggle
   - Full-screen overlay menu

2. **Footer** (`components/layout/footer.tsx`)
   - Site branding
   - Copyright information

3. **Layout Wrapper** (`components/layout/layout.tsx` - if it exists)
   - Main page structure
   - Header and Footer integration

4. **Sidebar** (`components/ui/navigation/sidebar.tsx`)
   - Collapsible sidebar behavior
   - Sidebar content rendering

## Test Files

The test files are located in `__tests__/ui/` and include:

1. `Header.test.tsx`
2. `Footer.test.tsx`
3. `Sidebar.test.tsx`

## Key Testing Areas

### 1. Navigation Rendering and Functionality

- Verifies all navigation links are rendered correctly
- Tests that links point to the correct routes
- Tests that the current page link has the correct active state
- Verifies dropdown and submenu behavior if present

### 2. Mobile Menu Functionality

- Tests open/close toggling of the mobile menu
- Verifies all navigation items are present in the mobile menu
- Tests menu visibility at different viewport sizes

### 3. Active States

- Confirms the active state is applied to the current page's navigation link
- Tests that only the current page link has the active state

### 4. Brand Elements

- Verifies logo and brand text are displayed correctly
- Tests that the logo links to the home page

### 5. Responsive Behavior

- Tests component layout at different viewport sizes (mobile, tablet, desktop)
- Verifies that menu transforms appropriately for different viewport sizes

### 6. Cursor Text Changes

- Tests that interactive elements set the appropriate cursor text on hover
- Verifies that cursor text is cleared when the mouse leaves the element

## Test Implementation

The test implementation for layout components follows these patterns:

1. **Component Rendering Tests**
   - Verifying all expected elements are in the DOM
   - Checking for correct class names and accessibility attributes

2. **Interaction Tests**
   - Using `fireEvent` or `userEvent` to simulate user interactions
   - Verifying state changes and UI updates

3. **Responsive Tests**
   - Using `window.matchMedia` mocks to test different viewport sizes
   - Checking how component behavior changes across breakpoints

4. **Cursor Text Tests**
   - Mocking `setCursorText` function to verify it's called correctly
   - Testing cursor text values for different interactive elements

5. **Accessibility Tests**
   - Using `jest-axe` to verify accessibility compliance
   - Testing keyboard navigation

## Example Test Case

```tsx
it('opens mobile menu when menu button is clicked', () => {
  render(<Header setCursorText={mockSetCursorText} />);
  
  // Find menu button
  const menuButton = screen.getByRole('button', { name: /menu/i });
  expect(menuButton).toBeInTheDocument();
  
  // Menu should be closed initially
  expect(screen.queryByText('NAVIGATION')).not.toBeInTheDocument();
  
  // Click menu button to open
  fireEvent.click(menuButton);
  
  // Menu should now be open
  expect(screen.getByText('NAVIGATION')).toBeInTheDocument();
  
  // Navigation links should be visible
  const navLinks = ['HOME', 'WORK', 'ABOUT', 'SERVICES'];
  navLinks.forEach(link => {
    expect(screen.getByText(link)).toBeInTheDocument();
  });
});
``` 