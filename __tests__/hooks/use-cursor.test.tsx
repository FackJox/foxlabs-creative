import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CursorProvider, useCursor } from '@/hooks/use-cursor';

// Helper component to test cursor interactions
const CursorTestComponent = () => {
  const { cursorText, setCursorText } = useCursor();
  
  return (
    <div>
      <p data-testid="cursor-text">{cursorText}</p>
      <button 
        data-testid="set-cursor-btn" 
        onMouseEnter={() => setCursorText('VIEW')}
        onMouseLeave={() => setCursorText('')}
      >
        Hover me
      </button>
    </div>
  );
};

// Wrapper for renderHook
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CursorProvider>{children}</CursorProvider>
);

describe('useCursor hook', () => {
  beforeEach(() => {
    // Mock window event listeners
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial cursor state', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    expect(result.current.cursorPosition).toEqual({ x: 0, y: 0 });
    expect(result.current.cursorText).toBe('');
    expect(typeof result.current.setCursorText).toBe('function');
  });

  it('adds and removes mousemove event listener', () => {
    renderHook(() => useCursor(), { wrapper });
    
    expect(window.addEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );

    // Get callback function from event listener call
    const callback = (window.addEventListener as jest.Mock).mock.calls[0][1];
    
    // Test position update with mock event
    act(() => {
      callback({ clientX: 100, clientY: 200 });
    });
    
    // Test cleanup
    const { unmount } = renderHook(() => useCursor(), { wrapper });
    unmount();
    
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
  });

  it('updates cursor text on hover', () => {
    render(
      <CursorProvider>
        <CursorTestComponent />
      </CursorProvider>
    );
    
    const button = screen.getByTestId('set-cursor-btn');
    const textDisplay = screen.getByTestId('cursor-text');
    
    // Initial text should be empty
    expect(textDisplay.textContent).toBe('');
    
    // Hover over button to set cursor text
    fireEvent.mouseEnter(button);
    expect(textDisplay.textContent).toBe('VIEW');
    
    // Mouse leave should clear cursor text
    fireEvent.mouseLeave(button);
    expect(textDisplay.textContent).toBe('');
  });

  it('allows setting cursor text programmatically', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    // Initial text should be empty
    expect(result.current.cursorText).toBe('');
    
    // Set cursor text
    act(() => {
      result.current.setCursorText('TEST');
    });
    
    // Text should be updated
    expect(result.current.cursorText).toBe('TEST');
  });
}); 