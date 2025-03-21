import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCursor from '@/components/effects/custom-cursor';
import { CursorProvider } from '@/hooks/use-cursor';

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => {
  const originalModule = jest.requireActual('@/hooks/use-cursor');
  
  return {
    __esModule: true,
    ...originalModule,
    useCursor: () => ({
      cursorPosition: { x: 100, y: 100 },
      cursorText: '',
      setCursorText: jest.fn(),
    }),
  };
});

describe('CustomCursor Component', () => {
  it('should render cursor small when cursor text is empty', () => {
    render(
      <CursorProvider>
        <CustomCursor />
      </CursorProvider>
    );
    
    // Main cursor should exist but be invisible when there's no cursor text
    const mainCursor = screen.getByTestId('cursor');
    expect(mainCursor).toBeInTheDocument();
    expect(mainCursor).not.toHaveClass('opacity-100');
    
    // Cursor small should be visible
    const cursorSmall = screen.getByTestId('cursor-small');
    expect(cursorSmall).toBeInTheDocument();
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
    const mainCursor = screen.getByTestId('cursor');
    expect(mainCursor).toBeInTheDocument();
    expect(mainCursor).toHaveClass('opacity-100');
    expect(mainCursor).toHaveTextContent('VIEW');
    
    // Cursor small should still be visible
    const cursorSmall = screen.getByTestId('cursor-small');
    expect(cursorSmall).toBeInTheDocument();
  });
}); 