import { useState, useEffect, useCallback } from 'react';
import { Service } from '@/lib/types';
import { fetchServices } from '@/lib/api/client';

// Cache for services data
let servicesCache: Service[] | null = null;

/**
 * Hook to fetch and manage services data
 * @param useCache Whether to use cached data if available
 * @param sortBy Optional field to sort services by
 * @returns Object containing loading state, error, data, and refetch function
 */
export function useServices(useCache: boolean = false, sortBy?: keyof Service) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Service[] | null>(null);

  const fetchData = useCallback(async () => {
    // Check cache first if caching is enabled
    if (useCache && servicesCache) {
      let sortedData = [...servicesCache];
      
      // Apply sorting if requested
      if (sortBy && sortedData.length > 0) {
        sortedData.sort((a, b) => {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
          }
          
          return 0;
        });
      }
      
      setData(sortedData);
      setError(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchServices();
      
      // Update cache if caching is enabled
      if (useCache) {
        servicesCache = result;
      }
      
      // Apply sorting if requested
      let sortedData = [...result];
      if (sortBy && sortedData.length > 0) {
        sortedData.sort((a, b) => {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
          }
          
          return 0;
        });
      }
      
      setData(sortedData);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch services'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [useCache, sortBy]);

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