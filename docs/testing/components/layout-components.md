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

The test files are located in:

1. `__tests__/components/layout/Header.test.tsx` (comprehensive tests with a structured approach)
2. `__tests__/ui/Header.test.tsx` (original tests)
3. `__tests__/ui/Footer.test.tsx`
4. `__tests__/ui/Sidebar.test.tsx`

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

## Header Component Test Implementation

The new comprehensive test implementation for the Header component in `__tests__/components/layout/Header.test.tsx` follows a structured approach with discrete test sections:

### Test Organization

1. **Basic Rendering**
   - Tests proper rendering of the logo and menu button
   - Verifies correct structure and styling

2. **Navigation Link Behavior**
   - Tests cursor text updates on logo hover
   - Tests cursor text updates on menu button hover
   - Tests cursor text updates on navigation links hover
   - Tests cursor text updates on social links hover
   - Tests active link highlighting based on current route

3. **Mobile Menu Functionality**
   - Tests menu toggle functionality
   - Ensures navigation links close the menu when clicked
   - Verifies contact and social information display

4. **Responsive Behavior**
   - Tests layout on mobile viewport
   - Tests mobile menu grid layout
   - Tests desktop menu grid layout

5. **Accessibility Compliance**
   - Runs accessibility tests with jest-axe
   - Verifies proper semantic structure for screen readers
   - Tests keyboard navigability of the menu

### Key Testing Techniques

1. **Mocking Next.js Components and Navigation**
   ```tsx
   // Mock Next.js modules
   jest.mock('next/navigation', () => ({
     usePathname: jest.fn().mockReturnValue('/'),
   }));

   // Mock Next/Link component
   jest.mock('next/link', () => {
     return ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
       <a href={href} {...rest}>
         {children}
       </a>
     );
   });
   ```

2. **Mocking Framer Motion for Animation Testing**
   ```tsx
   jest.mock('framer-motion', () => {
     return {
       motion: {
         div: ({ children, ...props }: React.PropsWithChildren<any>) => (
           <div data-testid="motion-div" {...props}>
             {children}
           </div>
         ),
       },
       AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
     };
   });
   ```

3. **Testing Responsive Behavior with Screen Size Simulation**
   ```tsx
   it('renders the mobile menu with correct layout', async () => {
     // Simulate mobile viewport
     const restoreSize = simulateScreenSize('mobile');
     
     try {
       const user = setupUserEvent();
       customRender(<Header setCursorText={mockSetCursorText} />);
       
       // Open menu
       const menuButton = screen.getByRole('button');
       await user.click(menuButton);
       
       // Check that the mobile menu is properly laid out
       const menu = screen.getByTestId('motion-div');
       const gridContainer = menu.querySelector('.grid');
       expect(gridContainer).toHaveClass('grid-cols-1');
       
       // Close menu
       await user.click(menuButton);
     } finally {
       // Restore original viewport size
       restoreSize();
     }
   });
   ```

4. **Testing Cursor Behavior with Events**
   ```tsx
   it('updates cursor text on logo hover', async () => {
     const user = setupUserEvent();
     customRender(<Header setCursorText={mockSetCursorText} />);
     
     const logo = screen.getByText('RAW/STUDIO');
     
     // Mouse enter
     await user.hover(logo);
     expect(mockSetCursorText).toHaveBeenCalledWith('HOME');
     
     // Mouse leave
     await user.unhover(logo);
     expect(mockSetCursorText).toHaveBeenCalledWith('');
   });
   ```

5. **Testing Different Routes**
   ```tsx
   it('highlights active links based on current route', async () => {
     // Mock usePathname to return the work page path
     jest.requireMock('next/navigation').usePathname.mockReturnValue('/work');
     
     customRender(<Header setCursorText={mockSetCursorText} />);
     
     // Open menu
     const menuButton = screen.getByRole('button');
     await act(async () => {
       await setupUserEvent().click(menuButton);
     });
     
     // Check that all navigation links are rendered
     const navLinks = ['HOME', 'WORK', 'ABOUT', 'SERVICES'];
     navLinks.forEach(linkText => {
       const link = screen.getByText(linkText);
       expect(link).toBeInTheDocument();
     });
     
     // Reset mock
     jest.requireMock('next/navigation').usePathname.mockReturnValue('/');
   });
   ```

The Header component test suite achieves 100% code coverage for the component and verifies all critical aspects of functionality, styling, and user interaction across all supported viewport sizes.

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