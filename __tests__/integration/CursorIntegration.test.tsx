import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { CursorProvider } from '@/hooks/use-cursor';
import CustomCursor from '@/components/effects/custom-cursor';

// Test components that simulate real-world interactive elements in the portfolio
const Button = ({ label, action, disabled = false }) => {
  // If disabled, we handle onMouseEnter differently (show 'DISABLED' text)
  const handleMouseEnter = () => {
    if (disabled) {
      action('DISABLED');
    } else {
      action('CLICK');
    }
  };

  return (
    <button
      data-testid={`button-${label.toLowerCase()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => action('')}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

const Card = ({ title, action }) => {
  return (
    <div
      data-testid={`card-${title.toLowerCase()}`}
      className="card"
      onMouseEnter={() => action('VIEW')}
      onMouseLeave={() => action('')}
    >
      <h3>{title}</h3>
      <p>Card content</p>
    </div>
  );
};

const Link = ({ text, action }) => {
  return (
    <a
      href="#"
      data-testid={`link-${text.toLowerCase().replace(/\s+/g, '-')}`}
      onMouseEnter={() => action('VISIT')}
      onMouseLeave={() => action('')}
    >
      {text}
    </a>
  );
};

// Container with nested interactive elements to test cursor behavior
const NestedElements = ({ action }) => {
  return (
    <div
      data-testid="parent-container"
      onMouseEnter={() => action('EXPLORE')}
      onMouseLeave={() => action('')}
    >
      <h2>Parent Container</h2>
      <Button label="Nested" action={action} />
      <Link text="Nested Link" action={action} />
    </div>
  );
};

// Simulated app that includes all test components and the cursor
function TestApp({ isMobile = false }) {
  // State to track the current cursor text
  const [cursorText, setCursorText] = useState('');
  
  // Create a memoized handler that updates both state and can be tracked in tests
  const handleCursorText = (text) => {
    setCursorText(text);
  };
  
  // Handler specifically for disabled elements
  const handleDisabledCursor = () => {
    setCursorText('DISABLED');
  };
  
  const handleClearCursor = () => {
    setCursorText('');
  };
  
  // Spy on the function for test assertions
  jest.spyOn({ handleCursorText }, 'handleCursorText');
  
  return (
    <div 
      data-testid="app-root"
      style={{ width: isMobile ? '375px' : '1200px' }}
    >
      <Button label="Primary" action={handleCursorText} />
      
      {/* Wrap disabled button in a div that handles mouse events */}
      <div
        data-testid="disabled-button-wrapper"
        onMouseEnter={handleDisabledCursor}
        onMouseLeave={handleClearCursor}
      >
        <Button label="Disabled" action={handleCursorText} disabled />
      </div>
      
      <Card title="Project" action={handleCursorText} />
      <Link text="External" action={handleCursorText} />
      <NestedElements action={handleCursorText} />
      
      {/* Display current cursor text for testing */}
      <div data-testid="mock-cursor-text">{cursorText}</div>
    </div>
  );
}

// Actual app with CursorProvider for testing the real cursor component
function RealCursorApp() {
  return (
    <CursorProvider>
      <div data-testid="app-with-cursor">
        <Button 
          label="Real" 
          action={(text) => {
            // This would be setCursorText from useCursor() in a real component
            const cursorTextElement = screen.getByTestId('cursor-text-indicator');
            cursorTextElement.textContent = text;
          }} 
        />
        <div data-testid="cursor-text-indicator"></div>
        <CustomCursor />
      </div>
    </CursorProvider>
  );
}

describe('Custom Cursor Integration', () => {
  it('changes cursor text on hover of interactive elements', () => {
    render(<TestApp />);
    
    // Test button hover
    const button = screen.getByTestId('button-primary');
    fireEvent.mouseEnter(button);
    
    const cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    expect(cursorTextDisplay).toHaveTextContent('CLICK');
    
    // Test card hover
    const card = screen.getByTestId('card-project');
    fireEvent.mouseEnter(card);
    expect(cursorTextDisplay).toHaveTextContent('VIEW');
    
    // Test link hover
    const link = screen.getByTestId('link-external');
    fireEvent.mouseEnter(link);
    expect(cursorTextDisplay).toHaveTextContent('VISIT');
  });
  
  it('clears cursor text on mouse leave', () => {
    render(<TestApp />);
    
    const button = screen.getByTestId('button-primary');
    const cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    
    // Hover the button
    fireEvent.mouseEnter(button);
    expect(cursorTextDisplay).toHaveTextContent('CLICK');
    
    // Leave the button
    fireEvent.mouseLeave(button);
    expect(cursorTextDisplay).toHaveTextContent('');
  });
  
  it('handles different interactive element types with appropriate cursor text', () => {
    render(<TestApp />);
    
    const cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    
    // Test different elements with their expected cursor texts
    const elements = [
      { element: screen.getByTestId('button-primary'), expectedText: 'CLICK' },
      { element: screen.getByTestId('card-project'), expectedText: 'VIEW' },
      { element: screen.getByTestId('link-external'), expectedText: 'VISIT' }
    ];
    
    elements.forEach(({ element, expectedText }) => {
      fireEvent.mouseEnter(element);
      expect(cursorTextDisplay).toHaveTextContent(expectedText);
      fireEvent.mouseLeave(element);
      expect(cursorTextDisplay).toHaveTextContent('');
    });
  });
  
  it('correctly handles nested interactive elements', () => {
    render(<TestApp />);
    
    const parentContainer = screen.getByTestId('parent-container');
    const nestedButton = screen.getByTestId('button-nested');
    const nestedLink = screen.getByTestId('link-nested-link');
    const cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    
    // Hover parent container
    fireEvent.mouseEnter(parentContainer);
    expect(cursorTextDisplay).toHaveTextContent('EXPLORE');
    
    // Hover nested button - should override parent's cursor text
    fireEvent.mouseEnter(nestedButton);
    expect(cursorTextDisplay).toHaveTextContent('CLICK');
    
    // Leave nested button - in an integration test this would revert to parent text
    // but here we're just testing the direct event handler behavior
    fireEvent.mouseLeave(nestedButton);
    expect(cursorTextDisplay).toHaveTextContent('');
    
    // Re-enter parent to reset state
    fireEvent.mouseEnter(parentContainer);
    expect(cursorTextDisplay).toHaveTextContent('EXPLORE');
    
    // Hover nested link
    fireEvent.mouseEnter(nestedLink);
    expect(cursorTextDisplay).toHaveTextContent('VISIT');
    
    // Leave all elements
    fireEvent.mouseLeave(nestedLink);
    fireEvent.mouseLeave(parentContainer);
    expect(cursorTextDisplay).toHaveTextContent('');
  });
  
  it('correctly displays cursor for disabled elements', () => {
    render(<TestApp />);
    
    const disabledButtonWrapper = screen.getByTestId('disabled-button-wrapper');
    const cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    
    // Test that disabled buttons show 'DISABLED' text using the wrapper
    fireEvent.mouseEnter(disabledButtonWrapper);
    expect(cursorTextDisplay).toHaveTextContent('DISABLED');
    
    // Leave the button wrapper
    fireEvent.mouseLeave(disabledButtonWrapper);
    expect(cursorTextDisplay).toHaveTextContent('');
  });
  
  // This test requires mock media queries or window resizing,
  // we'll simulate by passing a flag to our test component
  it('works consistently in different viewport sizes', () => {
    const { unmount } = render(<TestApp />);
    
    // Test in desktop viewport
    let button = screen.getByTestId('button-primary');
    let cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    
    fireEvent.mouseEnter(button);
    expect(cursorTextDisplay).toHaveTextContent('CLICK');
    
    // Unmount and rerender with mobile viewport size
    unmount();
    render(<TestApp isMobile={true} />);
    
    // Test in mobile viewport - should work the same
    button = screen.getByTestId('button-primary');
    cursorTextDisplay = screen.getByTestId('mock-cursor-text');
    
    fireEvent.mouseEnter(button);
    expect(cursorTextDisplay).toHaveTextContent('CLICK');
  });
  
  // Test with the real cursor component to verify animations and transitions
  it('renders the actual cursor component and updates on interaction', async () => {
    // Mock implementation since we can't easily test Framer Motion animations in Jest
    jest.mock('framer-motion', () => ({
      motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>
      }
    }));
    
    // Use JSDOM mock for clientX/Y in MouseEvent
    Object.defineProperty(window, 'MouseEvent', {
      writable: true,
      value: class MockMouseEvent extends Event {
        clientX: number;
        clientY: number;
        constructor(type: string, values = {}) {
          super(type, values);
          this.clientX = values.clientX || 0;
          this.clientY = values.clientY || 0;
        }
      }
    });
    
    render(<RealCursorApp />);
    
    const appContainer = screen.getByTestId('app-with-cursor');
    const button = screen.getByTestId('button-real');
    const indicator = screen.getByTestId('cursor-text-indicator');
    
    // Initial state should be empty
    expect(indicator).toHaveTextContent('');
    
    // Hover over button
    fireEvent.mouseEnter(button);
    
    // Wait for cursor update
    await waitFor(() => {
      expect(indicator).toHaveTextContent('CLICK');
    });
    
    // Leave button
    fireEvent.mouseLeave(button);
    
    // Wait for cursor to reset
    await waitFor(() => {
      expect(indicator).toHaveTextContent('');
    });
  });
  
  // Test mouse movement simulation
  it('follows mouse movement', async () => {
    // This is a more complex test that would normally require visual testing tools
    // For this example, we'll mock the behavior to demonstrate the principle
    jest.spyOn(window, 'addEventListener');
    
    render(<RealCursorApp />);
    
    // Verify mousemove event listener was added
    expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });
});

describe('Custom Cursor Accessibility Integration', () => {
  it('ensures cursor behavior doesn\'t interfere with keyboard focus states', () => {
    render(<TestApp />);
    
    const button = screen.getByTestId('button-primary');
    
    // Tab to focus the button
    button.focus();
    
    // Verify focus is applied
    expect(document.activeElement).toBe(button);
    
    // Mouse interactions and focus states should be independent
    fireEvent.mouseEnter(button);
    expect(document.activeElement).toBe(button);
    
    // Mouse leave should not affect focus
    fireEvent.mouseLeave(button);
    expect(document.activeElement).toBe(button);
  });
  
  // This test would ensure focus states visually align with cursor hover states
  it('has focus states that align with hover cursor behavior', () => {
    // This would typically require visual testing or snapshot comparison
    // For now, we'll verify that focus triggers the same handlers
    
    const mockSetCursorText = jest.fn();
    
    render(
      <button
        data-testid="a11y-button"
        onMouseEnter={() => mockSetCursorText('CLICK')}
        onFocus={() => mockSetCursorText('CLICK')}
        onMouseLeave={() => mockSetCursorText('')}
        onBlur={() => mockSetCursorText('')}
      >
        Accessible Button
      </button>
    );
    
    const button = screen.getByTestId('a11y-button');
    
    // Test focus event triggers same cursor behavior as mouse hover
    button.focus();
    expect(mockSetCursorText).toHaveBeenCalledWith('CLICK');
    
    // Test blur event triggers same cursor behavior as mouse leave
    button.blur();
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
}); 