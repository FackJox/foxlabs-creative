import { renderHook, waitFor, act } from '@testing-library/react';
import { useProjects } from '@/hooks/useProjects';
import { fetchProjects, fetchProjectsByCategory } from '@/lib/api/client';
import { mockProjects } from '../fixtures/mockData';

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  fetchProjects: jest.fn(),
  fetchProjectsByCategory: jest.fn(),
}));

describe('useProjects Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    // Setup mock implementation
    (fetchProjects as jest.Mock).mockImplementation(() => new Promise(() => {}));

    // Render the hook
    const { result } = renderHook(() => useProjects());

    // Assert initial loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('should fetch projects and update state accordingly', async () => {
    // Setup mock implementation
    (fetchProjects as jest.Mock).mockResolvedValue(mockProjects);

    // Render the hook
    const { result } = renderHook(() => useProjects());

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert data is loaded correctly
    expect(result.current.data).toEqual(mockProjects);
    expect(result.current.error).toBe(null);
    expect(fetchProjects).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when fetching projects fails', async () => {
    // Setup mock implementation with error
    const error = new Error('Failed to fetch projects');
    (fetchProjects as jest.Mock).mockRejectedValue(error);

    // Render the hook
    const { result } = renderHook(() => useProjects());

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert error state
    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBe(null);
  });

  it('should fetch projects by category when category is provided', async () => {
    // Setup mock implementation
    const filteredProjects = mockProjects.filter(p => p.category === 'web');
    (fetchProjectsByCategory as jest.Mock).mockResolvedValue(filteredProjects);

    // Render the hook with category
    const { result } = renderHook(() => useProjects('web'));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert data is loaded correctly with category filter
    expect(result.current.data).toEqual(filteredProjects);
    expect(fetchProjectsByCategory).toHaveBeenCalledWith('web');
    expect(fetchProjects).not.toHaveBeenCalled();
  });

  it('should trigger refetch when calling refetch function', async () => {
    // Setup mock implementation
    (fetchProjects as jest.Mock).mockResolvedValue(mockProjects);

    // Render the hook
    const { result } = renderHook(() => useProjects());

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchProjects as jest.Mock).mockClear();
    
    // Wrap the state updating call in act
    await act(async () => {
      result.current.refetch();
    });

    // Wait for the refetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify API was called again
    expect(fetchProjects).toHaveBeenCalledTimes(1);
  });

  it('should cache data between renders if enabled', async () => {
    // Setup mock implementation
    (fetchProjects as jest.Mock).mockResolvedValue(mockProjects);

    // Render the hook with caching enabled
    const { result, rerender } = renderHook(() => useProjects(undefined, true));

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchProjects as jest.Mock).mockClear();
    
    // Rerender the hook
    rerender();

    // Verify API was not called again due to caching
    expect(fetchProjects).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockProjects);
  });
}); 