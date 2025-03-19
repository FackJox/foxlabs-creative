import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile hook', () => {
  const originalMatchMedia = window.matchMedia;
  const originalInnerWidth = window.innerWidth;
  
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Restore original properties after each test
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth
    });
  });
  
  it('returns true when window width is below mobile breakpoint', () => {
    // Mock window properties for mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767 // Below 768px mobile breakpoint
    });
    
    // Mock the matchMedia method
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    
    const { result } = renderHook(() => useIsMobile());
    
    // Initial value should be true for mobile viewport
    expect(result.current).toBe(true);
  });
  
  it('returns false when window width is above mobile breakpoint', () => {
    // Mock window properties for desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024 // Above 768px mobile breakpoint
    });
    
    // Mock the matchMedia method
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    
    const { result } = renderHook(() => useIsMobile());
    
    // Initial value should be false for desktop viewport
    expect(result.current).toBe(false);
  });
  
  it('handles exactly at the mobile breakpoint (768px) as desktop', () => {
    // Mock window properties for desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768 // Exactly at the mobile breakpoint
    });
    
    // Mock the matchMedia method
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false, // Should be false at exactly 768px
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    
    const { result } = renderHook(() => useIsMobile());
    
    // At 768px it should be considered desktop (non-mobile)
    expect(result.current).toBe(false);
  });
  
  it('responds to window resize events', () => {
    // Initially mock desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024
    });
    
    // Create a mock for the matchMedia with listener storage
    let mediaQueryListeners = [];
    
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: window.innerWidth < 768,
      media: query,
      addEventListener: (event, cb) => {
        mediaQueryListeners.push(cb);
      },
      removeEventListener: (event, cb) => {
        mediaQueryListeners = mediaQueryListeners.filter(l => l !== cb);
      }
    }));
    
    const { result } = renderHook(() => useIsMobile());
    
    // Initial value should be false for desktop
    expect(result.current).toBe(false);
    
    // Simulate a change to mobile viewport
    act(() => {
      // Change window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 767 // Below mobile breakpoint
      });
      
      // Update matchMedia.matches
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: true, // Now it's true for mobile
        media: query,
        addEventListener: (event, cb) => {
          mediaQueryListeners.push(cb);
        },
        removeEventListener: (event, cb) => {
          mediaQueryListeners = mediaQueryListeners.filter(l => l !== cb);
        }
      }));
      
      // Trigger all the mediaQuery listeners
      mediaQueryListeners.forEach(listener => listener());
    });
    
    // Value should now be true for mobile
    expect(result.current).toBe(true);
  });
  
  it('cleans up event listeners on unmount', () => {
    // Setup matchMedia mock with tracking of event listeners
    const removeEventListenerMock = jest.fn();
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock
    }));
    
    // Render and unmount the hook
    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    
    // Should clean up by removing event listener
    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });
}); 