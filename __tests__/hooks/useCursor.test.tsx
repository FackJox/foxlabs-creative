import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useCursor, CursorProvider } from '@/hooks/use-cursor';

// Create a test component to test the hook
const TestComponent = () => {
  const { cursorText, setCursorText, cursorPosition } = useCursor();
  
  return (
    <div>
      <div data-testid="cursor-text">{cursorText}</div>
      <div data-testid="cursor-position-x">{cursorPosition.x}</div>
      <div data-testid="cursor-position-y">{cursorPosition.y}</div>
      <button 
        onClick={() => setCursorText('VIEW')}
        data-testid="set-cursor-button"
      >
        Set Cursor Text
      </button>
      <button 
        onClick={() => setCursorText('')}
        data-testid="clear-cursor-button"
      >
        Clear Cursor Text
      </button>
    </div>
  );
};

describe('useCursor hook', () => {
  it('provides default empty values', () => {
    render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );
    
    expect(screen.getByTestId('cursor-text')).toHaveTextContent('');
    expect(screen.getByTestId('cursor-position-x')).toHaveTextContent('0');
    expect(screen.getByTestId('cursor-position-y')).toHaveTextContent('0');
  });

  it('updates cursor text when setCursorText is called', () => {
    render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );
    
    fireEvent.click(screen.getByTestId('set-cursor-button'));
    expect(screen.getByTestId('cursor-text')).toHaveTextContent('VIEW');
    expect(document.body.getAttribute('data-cursor-text')).toBe('VIEW');
  });

  it('clears cursor text when empty string is set', () => {
    render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );
    
    // First set some text
    fireEvent.click(screen.getByTestId('set-cursor-button'));
    expect(screen.getByTestId('cursor-text')).toHaveTextContent('VIEW');
    
    // Then clear it
    fireEvent.click(screen.getByTestId('clear-cursor-button'));
    expect(screen.getByTestId('cursor-text')).toHaveTextContent('');
    expect(document.body.hasAttribute('data-cursor-text')).toBe(false);
  });

  it('updates cursor position on mouse move', () => {
    render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );
    
    act(() => {
      // Simulate a mouse move event
      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200
      }));
    });
    
    expect(screen.getByTestId('cursor-position-x')).toHaveTextContent('100');
    expect(screen.getByTestId('cursor-position-y')).toHaveTextContent('200');
  });
}); 