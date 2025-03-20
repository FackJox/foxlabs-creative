import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/lib/types';
import { fetchProjects, fetchProjectsByCategory } from '@/lib/api/client';

// Cache for projects data
let projectsCache: {
  all: Project[] | null;
  byCategory: Record<string, Project[]>;
} = {
  all: null,
  byCategory: {},
};

/**
 * Hook to fetch and manage projects data
 * @param category Optional category to filter projects
 * @param useCache Whether to use cached data if available
 * @returns Object containing loading state, error, data, and refetch function
 */
export function useProjects(category?: string, useCache: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Project[] | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result: Project[];
      
      if (category) {
        // Check cache for category data if caching is enabled
        if (useCache && projectsCache.byCategory[category]) {
          setData(projectsCache.byCategory[category]);
          setIsLoading(false);
          return;
        }
        
        // Fetch projects by category
        result = await fetchProjectsByCategory(category);
        
        // Update category cache
        if (useCache) {
          projectsCache.byCategory[category] = result;
        }
      } else {
        // Check cache for all projects if caching is enabled
        if (useCache && projectsCache.all) {
          setData(projectsCache.all);
          setIsLoading(false);
          return;
        }
        
        // Fetch all projects
        result = await fetchProjects();
        
        // Update cache
        if (useCache) {
          projectsCache.all = result;
        }
      }
      
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [category, useCache]);

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