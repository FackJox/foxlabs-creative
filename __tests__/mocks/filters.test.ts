import { projects, services } from '@/lib/data';
import type { Project, Service } from '@/lib/types';

// These are the filter functions that are embedded within the mocks
// We'll extract them here for testing purposes
const filterProjectsByCategory = (projects: Project[], category: string): Project[] => {
  return projects.filter(
    p => p.category.toUpperCase() === category.toUpperCase()
  );
};

const findServiceByTitle = (services: Service[], title: string): Service | undefined => {
  return services.find(
    s => s.title.toUpperCase() === title.toUpperCase()
  );
};

describe('Data Filtering Utilities', () => {
  describe('filterProjectsByCategory', () => {
    it('should filter projects by category', () => {
      const category = 'BRANDING';
      const result = filterProjectsByCategory(projects, category);
      
      // Verify all results have the correct category
      expect(result.length).toBeGreaterThan(0);
      result.forEach(project => {
        expect(project.category.toUpperCase()).toBe(category.toUpperCase());
      });
      
      // Verify we got all the matching projects
      const manualFilter = projects.filter(p => p.category.toUpperCase() === category.toUpperCase());
      expect(result.length).toBe(manualFilter.length);
    });
    
    it('should return an empty array if no projects match the category', () => {
      const nonExistentCategory = 'NON-EXISTENT';
      const result = filterProjectsByCategory(projects, nonExistentCategory);
      
      expect(result).toEqual([]);
    });
    
    it('should be case-insensitive when filtering', () => {
      // Test with lowercase
      const lowercaseCategory = 'website';
      const lowercaseResult = filterProjectsByCategory(projects, lowercaseCategory);
      
      // Test with uppercase
      const uppercaseCategory = 'WEBSITE';
      const uppercaseResult = filterProjectsByCategory(projects, uppercaseCategory);
      
      // Test with mixed case
      const mixedCaseCategory = 'WeBsItE';
      const mixedCaseResult = filterProjectsByCategory(projects, mixedCaseCategory);
      
      // All should return the same results
      expect(lowercaseResult).toEqual(uppercaseResult);
      expect(lowercaseResult).toEqual(mixedCaseResult);
    });

    it('should handle an empty projects array', () => {
      const result = filterProjectsByCategory([], 'BRANDING');
      expect(result).toEqual([]);
    });
  });
  
  describe('findServiceByTitle', () => {
    it('should find a service by title', () => {
      const serviceTitle = 'WEB DESIGN';
      const result = findServiceByTitle(services, serviceTitle);
      
      expect(result).toBeDefined();
      expect(result?.title.toUpperCase()).toBe(serviceTitle.toUpperCase());
    });
    
    it('should return undefined if no service matches the title', () => {
      const nonExistentTitle = 'NON-EXISTENT';
      const result = findServiceByTitle(services, nonExistentTitle);
      
      expect(result).toBeUndefined();
    });
    
    it('should be case-insensitive when finding a service', () => {
      // Test with lowercase
      const lowercaseTitle = 'web design';
      const lowercaseResult = findServiceByTitle(services, lowercaseTitle);
      
      // Test with uppercase
      const uppercaseTitle = 'WEB DESIGN';
      const uppercaseResult = findServiceByTitle(services, uppercaseTitle);
      
      // Test with mixed case
      const mixedCaseTitle = 'WeB DeSiGn';
      const mixedCaseResult = findServiceByTitle(services, mixedCaseTitle);
      
      // All should return the same result
      expect(lowercaseResult).toEqual(uppercaseResult);
      expect(lowercaseResult).toEqual(mixedCaseResult);
    });

    it('should handle an empty services array', () => {
      const result = findServiceByTitle([], 'WEB DESIGN');
      expect(result).toBeUndefined();
    });
  });
}); 