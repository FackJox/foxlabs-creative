import { useState, useEffect, useCallback } from 'react';
import { Service } from '@/lib/types';
import { fetchServiceByTitle } from '@/lib/api/client';

// Cache for service data
const serviceCache: Record<string, Service> = {};

/**
 * Hook to fetch and manage a single service
 * @param title Service title to fetch
 * @param useCache Whether to use cached data if available
 * @returns Object containing loading state, error, data, and refetch function
 */
export function useService(title: string, useCache: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Service | null>(null);

  const fetchData = useCallback(async () => {
    // Don't fetch if title is empty or undefined
    if (!title) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Check cache first if caching is enabled
    if (useCache && serviceCache[title]) {
      setData(serviceCache[title]);
      setError(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchServiceByTitle(title);
      setData(result);
      
      // Update cache if caching is enabled
      if (useCache) {
        serviceCache[title] = result;
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(`Failed to fetch service: ${title}`));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [title, useCache]);

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