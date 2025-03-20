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

## Testing Strategy

Our testing approach follows these principles:

1. **Modular Testing**: Testing each part of the cursor system in isolation
2. **Context Testing**: Ensuring context provider and consumer work correctly together
3. **Accessibility Focus**: Verifying the cursor doesn't interfere with accessibility features
4. **Event Handling**: Testing event listeners and mouse movement handling
5. **Visual Behavior**: Testing cursor appearance changes based on state

## CursorProvider Tests

### Provider Rendering

Tests that verify the CursorProvider renders its children correctly and properly manages event listeners:

```tsx
describe('Provider rendering', () => {
  it('renders its children correctly', () => {
    render(
      <CursorProvider>
        <TestComponent>Test Content</TestComponent>
      </CursorProvider>
    );
    
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('adds mousemove event listener when mounted', () => {
    render(<CursorProvider><div /></CursorProvider>);
    
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
  });
  
  it('removes mousemove event listener when unmounted', () => {
    const { unmount } = render(<CursorProvider><div /></CursorProvider>);
    
    unmount();
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
  });
});
```

### Cursor Positioning

Tests that verify the cursor position updates correctly on mouse movement:

```tsx
describe('Cursor positioning', () => {
  it('updates cursor position on mouse movement', () => {
    // Mock the implementation to capture the event handler
    let mouseMoveHandler: Function;
    window.addEventListener = jest.fn((event, handler) => {
      if (event === 'mousemove') {
        mouseMoveHandler = handler;
      }
    });
    
    // Component that displays cursor position from context
    const CursorPositionDisplay = () => {
      const { cursorPosition } = useCursor();
      
      return (
        <div data-testid="cursor-position">
          {cursorPosition.x},{cursorPosition.y}
        </div>
      );
    };
    
    render(
      <CursorProvider>
        <CursorPositionDisplay />
      </CursorProvider>
    );
    
    // Simulate mouse movement
    if (mouseMoveHandler) {
      act(() => {
        mouseMoveHandler({ clientX: 100, clientY: 200 });
      });
    }
    
    // Verify position was updated
    expect(screen.getByTestId('cursor-position').textContent).toBe('100,200');
  });
});
```

### Accessibility Concerns

Tests that verify the custom cursor doesn't interfere with accessibility features:

```tsx
describe('Accessibility concerns', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <CursorProvider>
        <TestComponent>Accessible content</TestComponent>
      </CursorProvider>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('allows regular keyboard navigation for children', () => {
    render(
      <CursorProvider>
        <button data-testid="first-btn">First</button>
        <button data-testid="second-btn">Second</button>
      </CursorProvider>
    );
    
    const firstButton = screen.getByTestId('first-btn');
    const secondButton = screen.getByTestId('second-btn');
    
    // Focus testing
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);
    
    secondButton.focus();
    expect(document.activeElement).toBe(secondButton);
  });
});
```

## useCursor Hook Tests

### Hook Functionality

Tests that verify the useCursor hook returns the expected properties and functions correctly:

```tsx
describe('Hook functionality', () => {
  it('returns the cursor context with expected properties', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    expect(result.current).toHaveProperty('cursorPosition');
    expect(result.current).toHaveProperty('cursorText');
    expect(result.current).toHaveProperty('setCursorText');
  });
  
  it('has initial state with default values', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    expect(result.current.cursorPosition).toEqual({ x: 0, y: 0 });
    expect(result.current.cursorText).toBe('');
    expect(typeof result.current.setCursorText).toBe('function');
  });
  
  it('updates cursor text when setCursorText is called', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    act(() => {
      result.current.setCursorText('TEST');
    });
    
    expect(result.current.cursorText).toBe('TEST');
  });
  
  it('clears cursor text when setCursorText is called with empty string', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    act(() => {
      result.current.setCursorText('TEST');
    });
    
    expect(result.current.cursorText).toBe('TEST');
    
    act(() => {
      result.current.setCursorText('');
    });
    
    expect(result.current.cursorText).toBe('');
  });
  
  it('provides a clearCursorText function via setCursorText with empty string', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    // Define clearCursorText as a convenience function
    const clearCursorText = () => result.current.setCursorText('');
    
    // Set cursor text first
    act(() => {
      result.current.setCursorText('TEST');
    });
    
    // Verify it was set
    expect(result.current.cursorText).toBe('TEST');
    
    // Clear cursor text using the clearCursorText function
    act(() => {
      clearCursorText();
    });
    
    // Check that cursor text was cleared
    expect(result.current.cursorText).toBe('');
  });
});
```

### Cursor Positioning

Tests that verify cursor position updating via event listeners:

```tsx
describe('Cursor positioning', () => {
  it('hooks into mousemove events to update cursor position', () => {
    renderHook(() => useCursor(), { wrapper });
    
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
  });
  
  it('updates cursor position when mousemove event fires', () => {
    // We need to capture the event handler to simulate mouse moves
    let capturedHandler: Function | null = null;
    
    // Mock the addEventListener to capture the handler
    window.addEventListener = jest.fn((event, handler) => {
      if (event === 'mousemove') {
        capturedHandler = handler as Function;
      }
    });
    
    const { result } = renderHook(() => useCursor(), { wrapper });
    
    // Check initial position
    expect(result.current.cursorPosition).toEqual({ x: 0, y: 0 });
    
    // Simulate a mouse move event
    if (capturedHandler) {
      act(() => {
        capturedHandler({ clientX: 100, clientY: 200 });
      });
    }
    
    // Verify position was updated
    expect(result.current.cursorPosition).toEqual({ x: 100, y: 200 });
  });
  
  it('removes event listener on unmount', () => {
    const { unmount } = renderHook(() => useCursor(), { wrapper });
    
    unmount();
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
  });
});
```

## Test Setup

### Mocking Window Events

To test event listeners effectively, we mock the window event methods:

```tsx
// Mock window methods
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

beforeEach(() => {
  // Save original methods
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;
  
  // Mock window methods
  window.addEventListener = mockAddEventListener;
  window.removeEventListener = mockRemoveEventListener;
  
  // Clean up after each test
  return () => {
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
    jest.clearAllMocks();
  };
});
```

### Test Provider Wrapper

For hook tests, we create a wrapper to provide the context:

```tsx
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CursorProvider>{children}</CursorProvider>
);
```

## Integration with RAW/STUDIO Components

The custom cursor is designed to enhance user interaction across the portfolio website by:

1. **Visual Feedback**: Providing visual cues on interactive elements
2. **Contextual Information**: Displaying action-oriented text (e.g., "VIEW", "CLOSE")
3. **Brutalist Design**: Maintaining the brutalist aesthetic through custom styling

Components throughout the site use the cursor system by:

```tsx
const MyComponent = () => {
  const { setCursorText } = useCursor();
  
  return (
    <button
      onMouseEnter={() => setCursorText('CLICK')}
      onMouseLeave={() => setCursorText('')}
    >
      Interactive Element
    </button>
  );
};
```

## Best Practices

When testing the custom cursor functionality, follow these best practices:

1. **Mock Event Listeners**: Always mock window event listeners to avoid affecting other tests
2. **Clean Up Mocks**: Reset mocks between tests to ensure isolation
3. **Test Accessibility**: Ensure the cursor doesn't interfere with keyboard navigation
4. **Test Real Interactions**: Use fireEvent for realistic user interactions
5. **Verify Context Updates**: Test that context state updates when expected

## Future Enhancements

1. **Test Custom Cursor Component Rendering**: Add tests specifically for the visual component
2. **Test with Reduced Motion Settings**: Verify the cursor respects user preferences
3. **End-to-end Tests**: Add E2E tests for cursor behavior across pages
4. **Performance Testing**: Verify the cursor doesn't impact page performance

## Common Patterns for Using the Custom Cursor

```tsx
// Button example
<Button
  onMouseEnter={() => setCursorText('CLICK')}
  onMouseLeave={() => setCursorText('')}
>
  Click Me
</Button>

// Link example
<Link
  href="/projects"
  onMouseEnter={() => setCursorText('VIEW')}
  onMouseLeave={() => setCursorText('')}
>
  View Projects
</Link>

// Image gallery example
<Image
  src={project.image}
  onMouseEnter={() => setCursorText('ENLARGE')}
  onMouseLeave={() => setCursorText('')}
/>
```

## Conclusion

The custom cursor testing approach ensures that:
- The cursor state management works correctly
- Mouse movement events are properly handled
- The cursor text updates as expected with different interactions
- Accessibility is maintained despite the custom cursor implementation
- The cursor enhances user experience without compromising usability 