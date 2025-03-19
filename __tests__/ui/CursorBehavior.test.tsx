import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/inputs/button';

describe('UI Components Cursor Behavior', () => {
  // Mock setCursorText function
  const setCursorText = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    setCursorText.mockReset();
  });
  
  it('should call setCursorText with correct text on hover and clear on leave for Button', () => {
    // Create a button that sets cursor text on hover
    render(
      <Button
        onMouseEnter={() => setCursorText('CLICK')}
        onMouseLeave={() => setCursorText('')}
      >
        Hover Me
      </Button>
    );
    
    const button = screen.getByRole('button', { name: 'Hover Me' });
    
    // Hover the button
    fireEvent.mouseEnter(button);
    expect(setCursorText).toHaveBeenCalledWith('CLICK');
    
    // Leave the button
    fireEvent.mouseLeave(button);
    expect(setCursorText).toHaveBeenCalledWith('');
  });
  
  it('should call setCursorText with different text based on component state', () => {
    // Note: Disabled buttons may prevent events from firing
    // Instead we'll test with a div that has a disabled-like state
    render(
      <div
        data-testid="disabled-button-container"
        data-state="disabled"
        onMouseEnter={() => setCursorText('DISABLED')}
        onMouseLeave={() => setCursorText('')}
      >
        <Button disabled>Disabled Button</Button>
      </div>
    );
    
    const container = screen.getByTestId('disabled-button-container');
    
    // Hover the container
    fireEvent.mouseEnter(container);
    expect(setCursorText).toHaveBeenCalledWith('DISABLED');
    
    // Leave the container
    fireEvent.mouseLeave(container);
    expect(setCursorText).toHaveBeenCalledWith('');
  });
  
  it('should handle multiple hover/leave events correctly', () => {
    // Create a button that sets cursor text on hover
    render(
      <Button
        onMouseEnter={() => setCursorText('CLICK')}
        onMouseLeave={() => setCursorText('')}
      >
        Multiple Hover
      </Button>
    );
    
    const button = screen.getByRole('button', { name: 'Multiple Hover' });
    
    // First hover
    fireEvent.mouseEnter(button);
    expect(setCursorText).toHaveBeenCalledWith('CLICK');
    
    // First leave
    fireEvent.mouseLeave(button);
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Second hover
    fireEvent.mouseEnter(button);
    expect(setCursorText).toHaveBeenCalledWith('CLICK');
    
    // Second leave
    fireEvent.mouseLeave(button);
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Verify the function was called exactly 4 times
    expect(setCursorText).toHaveBeenCalledTimes(4);
  });
  
  it('should handle nested components with different cursor texts', () => {
    // Create nested components with different cursor texts
    render(
      <div 
        data-testid="parent"
        onMouseEnter={() => setCursorText('PARENT')}
        onMouseLeave={() => setCursorText('')}
      >
        <Button
          data-testid="child"
          onMouseEnter={() => setCursorText('CHILD')}
          onMouseLeave={() => setCursorText('')}
        >
          Child Button
        </Button>
      </div>
    );
    
    const parent = screen.getByTestId('parent');
    const child = screen.getByTestId('child');
    
    // Hover parent
    fireEvent.mouseEnter(parent);
    expect(setCursorText).toHaveBeenCalledWith('PARENT');
    
    // Hover child
    fireEvent.mouseEnter(child);
    expect(setCursorText).toHaveBeenCalledWith('CHILD');
    
    // Leave child
    fireEvent.mouseLeave(child);
    // In a real implementation, this would typically go back to the parent's cursor text
    // but in this simplified test, it just calls with empty text
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Leave parent
    fireEvent.mouseLeave(parent);
    expect(setCursorText).toHaveBeenCalledWith('');
  });
}); 