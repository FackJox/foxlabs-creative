import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/lib/types';
import { fetchProjectById } from '@/lib/api/client';

// Cache for project data
const projectCache: Record<string, Project> = {};

/**
 * Hook to fetch and manage a single project
 * @param id Project ID to fetch
 * @param useCache Whether to use cached data if available
 * @returns Object containing loading state, error, data, and refetch function
 */
export function useProject(id: number | string | null, useCache: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Project | null>(null);

  const fetchData = useCallback(async () => {
    // Don't fetch if id is null or undefined
    if (id === null || id === undefined) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Convert id to string for cache key
    const cacheKey = String(id);
    
    // Check cache first if caching is enabled
    if (useCache && projectCache[cacheKey]) {
      setData(projectCache[cacheKey]);
      setError(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchProjectById(id);
      setData(result);
      
      // Update cache if caching is enabled
      if (useCache) {
        projectCache[cacheKey] = result;
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(`Failed to fetch project with ID ${id}`));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, useCache]);

  // Fetch data on mount or when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to manually refetch data
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, error, data, refetch };
} 