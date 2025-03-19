import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useToast, reducer } from '@/hooks/use-toast';

describe('useToast hook', () => {
  // Store original setTimeout and clearTimeout
  const originalSetTimeout = global.setTimeout;
  const originalClearTimeout = global.clearTimeout;
  
  beforeEach(() => {
    // Mock setTimeout and clearTimeout
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    // Restore original timer functions
    jest.useRealTimers();
    global.setTimeout = originalSetTimeout;
    global.clearTimeout = originalClearTimeout;
    
    // Reset global toast state
    act(() => {
      try {
        const { result } = renderHook(() => useToast());
        result.current.dismiss();
      } catch (e) {
        // Ignore errors during cleanup
      }
    });
  });
  
  it('should provide toast and dismiss functions', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toast).toBeDefined();
    expect(result.current.dismiss).toBeDefined();
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });
  
  it('should add a toast with the correct properties', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'This is a test toast',
        variant: 'default',
      });
    });
    
    // Check that a toast was added with the correct properties
    expect(result.current.toasts.length).toBeGreaterThan(0);
    const toast = result.current.toasts[0];
    expect(toast.title).toBe('Test Toast');
    expect(toast.description).toBe('This is a test toast');
    expect(toast.variant).toBe('default');
    expect(toast.open).toBe(true);
  });
  
  it('should dismiss a specific toast by id', () => {
    const { result } = renderHook(() => useToast());
    let toastId = '';
    
    // Add a toast
    act(() => {
      const response = result.current.toast({
        title: 'Test Toast',
        description: 'This is a test toast',
      });
      toastId = response.id;
    });
    
    // Make sure it was added
    expect(result.current.toasts.length).toBeGreaterThan(0);
    
    // Dismiss the toast
    act(() => {
      result.current.dismiss(toastId);
    });
    
    // The toast should be marked as not open
    const toast = result.current.toasts.find(t => t.id === toastId);
    expect(toast?.open).toBe(false);
  });
  
  describe('reducer', () => {
    it('should handle ADD_TOAST action', () => {
      const initialState = { toasts: [] };
      const newToast = { 
        id: '1', 
        title: 'Test Toast',
        open: true
      };
      
      const nextState = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: newToast
      });
      
      expect(nextState.toasts).toHaveLength(1);
      expect(nextState.toasts[0]).toEqual(newToast);
    });
    
    it('should handle UPDATE_TOAST action', () => {
      const initialState = { 
        toasts: [{ 
          id: '1', 
          title: 'Initial Toast',
          description: 'Initial description',
          open: true
        }] 
      };
      
      const nextState = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { 
          id: '1', 
          title: 'Updated Toast'
        }
      });
      
      expect(nextState.toasts[0].title).toBe('Updated Toast');
      expect(nextState.toasts[0].description).toBe('Initial description');
    });
    
    it('should handle DISMISS_TOAST action for a specific toast', () => {
      const initialState = { 
        toasts: [
          { id: '1', open: true },
          { id: '2', open: true }
        ] 
      };
      
      const nextState = reducer(initialState, {
        type: 'DISMISS_TOAST',
        toastId: '1'
      });
      
      expect(nextState.toasts[0].open).toBe(false);
      expect(nextState.toasts[1].open).toBe(true);
    });
    
    it('should handle DISMISS_TOAST action for all toasts', () => {
      const initialState = { 
        toasts: [
          { id: '1', open: true },
          { id: '2', open: true }
        ] 
      };
      
      const nextState = reducer(initialState, {
        type: 'DISMISS_TOAST'
      });
      
      expect(nextState.toasts[0].open).toBe(false);
      expect(nextState.toasts[1].open).toBe(false);
    });
    
    it('should handle REMOVE_TOAST action for a specific toast', () => {
      const initialState = { 
        toasts: [
          { id: '1', open: false },
          { id: '2', open: true }
        ] 
      };
      
      const nextState = reducer(initialState, {
        type: 'REMOVE_TOAST',
        toastId: '1'
      });
      
      expect(nextState.toasts).toHaveLength(1);
      expect(nextState.toasts[0].id).toBe('2');
    });
    
    it('should handle REMOVE_TOAST action for all toasts', () => {
      const initialState = { 
        toasts: [
          { id: '1', open: false },
          { id: '2', open: false }
        ] 
      };
      
      const nextState = reducer(initialState, {
        type: 'REMOVE_TOAST'
      });
      
      expect(nextState.toasts).toHaveLength(0);
    });
  });
}); 