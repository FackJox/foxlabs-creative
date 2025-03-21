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
  it('should render cursor trail and dots when cursor text is empty', () => {
    render(
      <CursorProvider>
        <CustomCursor />
      </CursorProvider>
    );
    
    // Main cursor should exist but be invisible when there's no cursor text
    const mainCursor = document.querySelector('.fixed.z-50.flex.h-20.w-20');
    expect(mainCursor).toBeInTheDocument();
    
    // Check that cursor trail exists
    const cursorTrail = document.querySelector('.fixed.z-40.h-3.w-3');
    expect(cursorTrail).toBeInTheDocument();
    
    // Check that cursor dots exist (should be 5)
    const cursorDots = document.querySelectorAll('.fixed.z-40.h-1.w-1');
    expect(cursorDots.length).toBe(5);
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
    const mainCursor = document.querySelector('.opacity-100');
    expect(mainCursor).toBeInTheDocument();
    expect(mainCursor).toHaveTextContent('VIEW');
  });
}); 