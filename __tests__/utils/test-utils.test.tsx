import React from 'react';
import { axe } from 'jest-axe';
import { 
  customRender, 
  setupUserEvent, 
  testAccessibility, 
  simulateScreenSize, 
  createMockRect,
  screenSizes,
  screen,
  useMockCursor,
  fireEvent,
  act
} from './test-utils.tsx';

// Simple component to test cursor functionality
const TestCursorComponent = () => {
  const { cursorText, setCursorText } = useMockCursor();
  
  return (
    <div>
      <p data-testid="cursor-text">{cursorText || 'No cursor text'}</p>
      <button 
        data-testid="cursor-button"
        onMouseEnter={() => setCursorText('VIEW')}
        onMouseLeave={() => setCursorText('')}
      >
        Hover me
      </button>
    </div>
  );
};

// Simple responsive component
const ResponsiveComponent = () => {
  return (
    <div>
      <div className="hidden sm:block" data-testid="desktop-only">Desktop Content</div>
      <div className="block sm:hidden" data-testid="mobile-only">Mobile Content</div>
    </div>
  );
};

// Simple component for accessibility testing
const AccessibleButton = ({ label }: { label: string }) => {
  return (
    <button aria-label={label}>
      {label}
    </button>
  );
};

describe('Test Utilities', () => {
  describe('Custom Render with CursorProvider', () => {
    it('renders components with cursor context', () => {
      // Render with initial cursor text
      const { rerender } = customRender(<TestCursorComponent />, {
        mockCursorText: 'INITIAL'
      });
      
      // Check initial text
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('INITIAL');
      
      // Manually update cursor text directly by re-rendering with new props
      rerender(<TestCursorComponent />);
      
      // Get the button and trigger the mouse enter manually
      const button = screen.getByTestId('cursor-button');
      
      // Use fireEvent directly to trigger the onMouseEnter handler
      act(() => {
        fireEvent.mouseEnter(button);
      });
      
      // Verify cursor text was updated
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('VIEW');
      
      // Now trigger mouse leave
      act(() => {
        fireEvent.mouseLeave(button);
      });
      
      // Verify cursor text was cleared
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('No cursor text');
    });
  });
  
  describe('User Event Setup', () => {
    it('works with user event setup', async () => {
      const user = setupUserEvent();
      customRender(<TestCursorComponent />);
      
      const button = screen.getByTestId('cursor-button');
      
      // Click the button using userEvent
      await user.click(button);
      
      // Assert any expectations based on the click
      expect(button).toBeInTheDocument();
    });
  });
  
  describe('Accessibility Testing', () => {
    it('performs accessibility checks', async () => {
      const { container } = customRender(<AccessibleButton label="Accessible Button" />);
      
      // Test accessibility using our helper
      const results = await testAccessibility(container);
      expect(results).toHaveNoViolations();
    });
  });
  
  describe('Responsive Testing', () => {
    it('simulates different screen sizes', () => {
      customRender(<ResponsiveComponent />);
      
      // Start with desktop size
      simulateScreenSize('desktop');
      expect(window.innerWidth).toBe(screenSizes.desktop.width);
      expect(screen.getByTestId('desktop-only')).toBeInTheDocument();
      
      // Switch to mobile size
      const restoreSize = simulateScreenSize('mobile');
      expect(window.innerWidth).toBe(screenSizes.mobile.width);
      expect(screen.getByTestId('mobile-only')).toBeInTheDocument();
      
      // Clean up by restoring original size
      restoreSize();
    });
    
    it('creates mock DOMRect objects for different screen sizes', () => {
      const mobileRect = createMockRect('mobile');
      expect(mobileRect.width).toBe(screenSizes.mobile.width);
      expect(mobileRect.height).toBe(screenSizes.mobile.height);
      
      const customRect = createMockRect('desktop', { x: 100, y: 200 });
      expect(customRect.width).toBe(screenSizes.desktop.width);
      expect(customRect.x).toBe(100);
      expect(customRect.y).toBe(200);
    });
  });
}); 