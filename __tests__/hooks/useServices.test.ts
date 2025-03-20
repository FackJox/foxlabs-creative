import { renderHook, waitFor, act } from '@testing-library/react';
import { useServices } from '@/hooks/useServices';
import { fetchServices } from '@/lib/api/client';
import { mockServices } from '../fixtures/mockData';

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  fetchServices: jest.fn(),
}));

describe('useServices Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    // Setup mock implementation
    (fetchServices as jest.Mock).mockImplementation(() => new Promise(() => {}));

    // Render the hook
    const { result } = renderHook(() => useServices());

    // Assert initial loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('should fetch services and update state accordingly', async () => {
    // Setup mock implementation
    (fetchServices as jest.Mock).mockResolvedValue(mockServices);

    // Render the hook
    const { result } = renderHook(() => useServices());

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert data is loaded correctly
    expect(result.current.data).toEqual(mockServices);
    expect(result.current.error).toBe(null);
    expect(fetchServices).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when fetching services fails', async () => {
    // Setup mock implementation with error
    const error = new Error('Failed to fetch services');
    (fetchServices as jest.Mock).mockRejectedValue(error);

    // Render the hook
    const { result } = renderHook(() => useServices());

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert error state
    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBe(null);
  });

  it('should trigger refetch when calling refetch function', async () => {
    // Setup mock implementation
    (fetchServices as jest.Mock).mockResolvedValue(mockServices);

    // Render the hook
    const { result } = renderHook(() => useServices());

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchServices as jest.Mock).mockClear();
    
    // Call refetch
    await act(async () => {
      result.current.refetch();
    });

    // Wait for the refetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify API was called again
    expect(fetchServices).toHaveBeenCalledTimes(1);
  });

  it('should cache data between renders if enabled', async () => {
    // Setup mock implementation
    (fetchServices as jest.Mock).mockResolvedValue(mockServices);

    // Render the hook with caching enabled
    const { result, rerender } = renderHook(() => useServices(true));

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchServices as jest.Mock).mockClear();
    
    // Rerender the hook
    await act(async () => {
      rerender();
    });

    // Verify API was not called again due to caching
    expect(fetchServices).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockServices);
  });

  it('should apply correct sorting when sort option is provided', async () => {
    // Setup mock implementation
    (fetchServices as jest.Mock).mockResolvedValue(mockServices);

    // Render the hook with sorting
    const { result } = renderHook(() => useServices(false, 'title'));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert data is sorted by title
    if (result.current.data && result.current.data.length > 1) {
      const sortedByTitle = [...mockServices].sort((a, b) => a.title.localeCompare(b.title));
      expect(result.current.data).toEqual(sortedByTitle);
    }
  });
}); 