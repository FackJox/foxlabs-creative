import { renderHook, waitFor, act } from '@testing-library/react';
import { useProject } from '@/hooks/useProject';
import { fetchProjectById } from '@/lib/api/client';
import { mockProjects } from '../fixtures/mockData';

// Mock the API client
jest.mock('@/lib/api/client', () => ({
  fetchProjectById: jest.fn(),
}));

describe('useProject Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    // Setup mock implementation
    (fetchProjectById as jest.Mock).mockImplementation(() => new Promise(() => {}));

    // Render the hook
    const { result } = renderHook(() => useProject(1));

    // Assert initial loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
  });

  it('should fetch project and update state accordingly', async () => {
    // Setup mock implementation
    const mockProject = mockProjects[0];
    (fetchProjectById as jest.Mock).mockResolvedValue(mockProject);

    // Render the hook
    const { result } = renderHook(() => useProject(1));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert data is loaded correctly
    expect(result.current.data).toEqual(mockProject);
    expect(result.current.error).toBe(null);
    expect(fetchProjectById).toHaveBeenCalledWith(1);
  });

  it('should handle errors when fetching project fails', async () => {
    // Setup mock implementation with error
    const error = new Error('Failed to fetch project');
    (fetchProjectById as jest.Mock).mockRejectedValue(error);

    // Render the hook
    const { result } = renderHook(() => useProject(1));

    // Wait for the hook to update
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert error state
    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBe(null);
  });

  it('should not fetch when id is null or undefined', () => {
    // Render the hook with no id
    const { result } = renderHook(() => useProject(null));

    // Assert idle state with no API call
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(null);
    expect(fetchProjectById).not.toHaveBeenCalled();
  });

  it('should refetch when id changes', async () => {
    // Setup mock implementation
    const mockProject1 = mockProjects[0];
    const mockProject2 = mockProjects[1];
    
    (fetchProjectById as jest.Mock)
      .mockImplementation((id) => {
        if (id === 1) return Promise.resolve(mockProject1);
        if (id === 2) return Promise.resolve(mockProject2);
        return Promise.reject(new Error('Unknown ID'));
      });

    // Render the hook
    const { result, rerender } = renderHook((props) => useProject(props), {
      initialProps: 1,
    });

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert first project data is loaded
    expect(result.current.data).toEqual(mockProject1);
    
    // Change the project id
    await act(async () => {
      rerender(2);
    });
    
    // Wait for the second fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Assert second project data is loaded
    expect(result.current.data).toEqual(mockProject2);
    expect(fetchProjectById).toHaveBeenCalledTimes(2);
    expect(fetchProjectById).toHaveBeenNthCalledWith(1, 1);
    expect(fetchProjectById).toHaveBeenNthCalledWith(2, 2);
  });
  
  it('should trigger refetch when calling refetch function', async () => {
    // Setup mock implementation
    const mockProject = mockProjects[0];
    (fetchProjectById as jest.Mock).mockResolvedValue(mockProject);

    // Render the hook
    const { result } = renderHook(() => useProject(1));

    // Wait for the initial fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Reset the mock to track new calls
    (fetchProjectById as jest.Mock).mockClear();
    
    // Call refetch
    await act(async () => {
      result.current.refetch();
    });

    // Wait for the refetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify API was called again
    expect(fetchProjectById).toHaveBeenCalledTimes(1);
    expect(fetchProjectById).toHaveBeenCalledWith(1);
  });
}); 