import { renderHook, waitFor, act } from '@testing-library/react';
import { useService } from '@/hooks/useService';
import { fetchServiceByTitle } from '@/lib/api/client';
import { mockServices } from '../fixtures/mockData';

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  fetchServiceByTitle: jest.fn(),
}));

describe('useService Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    // Setup mock implementation
    (fetchServiceByTitle as jest.Mock).mockImplementation(() => new Promise(() => {}));

    // Render the hook
    const { result } = renderHook(() => useService('Web Development'));

    // Assert initial loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('should fetch service and update state accordingly', async () => {
    // Setup mock implementation
    const mockService = mockServices[0];
    (fetchServiceByTitle as jest.Mock).mockResolvedValue(mockService);

    // Render the hook
    const { result } = renderHook(() => useService('Web Development'));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert data is loaded correctly
    expect(result.current.data).toEqual(mockService);
    expect(result.current.error).toBe(null);
    expect(fetchServiceByTitle).toHaveBeenCalledWith('Web Development');
  });

  it('should handle errors when fetching service fails', async () => {
    // Setup mock implementation with error
    const error = new Error('Failed to fetch service');
    (fetchServiceByTitle as jest.Mock).mockRejectedValue(error);

    // Render the hook
    const { result } = renderHook(() => useService('Web Development'));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert error state
    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBe(null);
  });

  it('should not fetch when title is null or empty', () => {
    // Render the hook with no title
    const { result } = renderHook(() => useService(''));

    // Assert idle state with no API call
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
    expect(fetchServiceByTitle).not.toHaveBeenCalled();
  });

  it('should refetch when title changes', async () => {
    // Setup mock implementation
    const mockService1 = mockServices[0];
    const mockService2 = mockServices[1];
    
    (fetchServiceByTitle as jest.Mock)
      .mockImplementation((title) => {
        if (title === 'Web Development') return Promise.resolve(mockService1);
        if (title === 'Branding') return Promise.resolve(mockService2);
        return Promise.reject(new Error('Unknown service'));
      });

    // Render the hook
    const { result, rerender } = renderHook((props) => useService(props), {
      initialProps: 'Web Development',
    });

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert first service data is loaded
    expect(result.current.data).toEqual(mockService1);
    
    // Change the service title
    await act(async () => {
      rerender('Branding');
    });
    
    // Wait for the second fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Assert second service data is loaded
    expect(result.current.data).toEqual(mockService2);
    expect(fetchServiceByTitle).toHaveBeenCalledTimes(2);
    expect(fetchServiceByTitle).toHaveBeenNthCalledWith(1, 'Web Development');
    expect(fetchServiceByTitle).toHaveBeenNthCalledWith(2, 'Branding');
  });
  
  it('should trigger refetch when calling refetch function', async () => {
    // Setup mock implementation
    const mockService = mockServices[0];
    (fetchServiceByTitle as jest.Mock).mockResolvedValue(mockService);

    // Render the hook
    const { result } = renderHook(() => useService('Web Development'));

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchServiceByTitle as jest.Mock).mockClear();
    
    // Call refetch
    await act(async () => {
      result.current.refetch();
    });

    // Wait for the refetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify API was called again
    expect(fetchServiceByTitle).toHaveBeenCalledTimes(1);
    expect(fetchServiceByTitle).toHaveBeenCalledWith('Web Development');
  });

  it('should cache data if enabled', async () => {
    // Setup mock implementation
    const mockService = mockServices[0];
    (fetchServiceByTitle as jest.Mock).mockResolvedValue(mockService);

    // Render the hook with caching enabled
    const { result, rerender } = renderHook(
      ({ title, useCache }) => useService(title, useCache), 
      { initialProps: { title: 'Web Development', useCache: true } }
    );

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchServiceByTitle as jest.Mock).mockClear();
    
    // Rerender with same title
    await act(async () => {
      rerender({ title: 'Web Development', useCache: true });
    });

    // Verify API was not called again due to caching
    expect(fetchServiceByTitle).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockService);
  });
}); 