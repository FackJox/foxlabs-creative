import React, { createContext, useContext, useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock implementation of CursorContext and CursorProvider
const CursorContext = createContext({
  cursorText: '',
  setCursorText: (text: string) => {},
  cursorVariant: 'default',
  setCursorVariant: (variant: string) => {},
});

function CursorProvider({ children }) {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const value = {
    cursorText,
    setCursorText,
    cursorVariant,
    setCursorVariant,
  };
  
  return (
    <CursorContext.Provider value={value}>
      {children}
      <div data-testid="mock-cursor">
        <span data-testid="cursor-text">{cursorText}</span>
        <span data-testid="cursor-variant">{cursorVariant}</span>
      </div>
    </CursorContext.Provider>
  );
}

// Custom hook that uses the cursor context
function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

// Test components that use the cursor context
function InteractiveButton() {
  const { setCursorText, setCursorVariant } = useCursor();
  
  const handleMouseEnter = () => {
    setCursorText('CLICK');
    setCursorVariant('button');
  };
  
  const handleMouseLeave = () => {
    setCursorText('');
    setCursorVariant('default');
  };
  
  return (
    <button
      data-testid="interactive-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      HOVER ME
    </button>
  );
}

function InteractiveLink() {
  const { setCursorText, setCursorVariant } = useCursor();
  
  const handleMouseEnter = () => {
    setCursorText('VIEW');
    setCursorVariant('link');
  };
  
  const handleMouseLeave = () => {
    setCursorText('');
    setCursorVariant('default');
  };
  
  return (
    <a
      href="#"
      data-testid="interactive-link"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      HOVER ME TOO
    </a>
  );
}

// Parent component that includes both interactive elements
function TestApp() {
  return (
    <CursorProvider>
      <div data-testid="app-container">
        <h1>Cursor Context Test</h1>
        <InteractiveButton />
        <InteractiveLink />
      </div>
    </CursorProvider>
  );
}

describe('Cursor Context Provider Integration', () => {
  it('renders the cursor provider with default values', () => {
    render(<TestApp />);
    
    // Check that the cursor is rendered with default values
    expect(screen.getByTestId('mock-cursor')).toBeInTheDocument();
    expect(screen.getByTestId('cursor-text')).toHaveTextContent('');
    expect(screen.getByTestId('cursor-variant')).toHaveTextContent('default');
  });

  it('updates cursor text and variant when hovering over the button', async () => {
    render(<TestApp />);
    
    // Get the button element
    const button = screen.getByTestId('interactive-button');
    
    // Hover over the button
    fireEvent.mouseEnter(button);
    
    // Check that the cursor text and variant are updated
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('CLICK');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('button');
    });
    
    // Move away from the button
    fireEvent.mouseLeave(button);
    
    // Check that the cursor text and variant are reset
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('default');
    });
  });

  it('updates cursor text and variant when hovering over the link', async () => {
    render(<TestApp />);
    
    // Get the link element
    const link = screen.getByTestId('interactive-link');
    
    // Hover over the link
    fireEvent.mouseEnter(link);
    
    // Check that the cursor text and variant are updated
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('VIEW');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('link');
    });
    
    // Move away from the link
    fireEvent.mouseLeave(link);
    
    // Check that the cursor text and variant are reset
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('default');
    });
  });

  it('maintains cursor state when interacting with multiple elements', async () => {
    render(<TestApp />);
    
    // Get the interactive elements
    const button = screen.getByTestId('interactive-button');
    const link = screen.getByTestId('interactive-link');
    
    // Hover over the button
    fireEvent.mouseEnter(button);
    
    // Check button hover state
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('CLICK');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('button');
    });
    
    // Move directly to the link without resetting
    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(link);
    
    // Check that cursor now reflects link hover state
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('VIEW');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('link');
    });
    
    // Move away from all elements
    fireEvent.mouseLeave(link);
    
    // Check that cursor is reset
    await waitFor(() => {
      expect(screen.getByTestId('cursor-text')).toHaveTextContent('');
      expect(screen.getByTestId('cursor-variant')).toHaveTextContent('default');
    });
  });
}); 