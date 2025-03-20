import type { Project, Service } from '@/lib/types'
import { 
  formatProjectsForListing,
  enhanceProjectWithServiceDetails,
  createDescriptionExcerpt,
  formatDate,
  getFullImagePath,
  trimLongText
} from '@/lib/utils/dataFormatters'
import { mockProjects, mockServices } from '../fixtures/mockData'

describe('Data Formatter Functions', () => {
  describe('formatProjectsForListing', () => {
    it('should format projects for listing view', () => {
      const formatted = formatProjectsForListing(mockProjects);
      
      expect(formatted.length).toBe(mockProjects.length);
      
      // Each formatted project should have basic fields
      formatted.forEach(project => {
        expect(project.title).toBeDefined();
        expect(project.category).toBeDefined();
        // Some mock projects might not have images
        if (project.image !== undefined) {
          expect(typeof project.image).toBe('string');
        }
        expect(project.year).toBeDefined();
      });
    });
    
    it('should handle empty projects array', () => {
      const formatted = formatProjectsForListing([]);
      expect(formatted).toEqual([]);
    });
    
    it('should handle projects with missing fields', () => {
      // Create a project with minimal fields
      const incompleteProject = { 
        ...mockProjects[0], 
        id: 999,
        title: "Test Project",
        description: "Test description"
      };
      
      const formatted = formatProjectsForListing([incompleteProject]);
      expect(formatted.length).toBe(1);
      expect(formatted[0].title).toBeDefined();
    });
  })
  
  describe('createDescriptionExcerpt', () => {
    it('should create a short excerpt from a description', () => {
      const description = 'This is a very long description that needs to be shortened to create an excerpt for display purposes.';
      const excerpt = createDescriptionExcerpt(description);
      
      expect(excerpt.length).toBeLessThan(description.length);
      expect(excerpt.endsWith('...')).toBe(true);
    });
    
    it('should handle short descriptions that do not need truncation', () => {
      const shortDescription = 'Short text';
      const excerpt = createDescriptionExcerpt(shortDescription);
      
      expect(excerpt).toBe(shortDescription);
    });
    
    it('should handle undefined or empty descriptions', () => {
      // Handle undefined with a default empty string
      expect(createDescriptionExcerpt(undefined)).toBe('');
      expect(createDescriptionExcerpt('')).toBe('');
    });
    
    it('should respect the provided maxLength', () => {
      const description = 'This is a description that will be truncated';
      const maxLength = 10;
      const excerpt = createDescriptionExcerpt(description, maxLength);
      
      expect(excerpt.length).toBeLessThanOrEqual(maxLength + 3); // +3 for the ellipsis
      expect(excerpt).toBe('This is...');
    });
  })
  
  describe('enhanceProjectWithServiceDetails', () => {
    it('should add service details to project', () => {
      // Create a project with services that exist in mockServices
      const projectWithServices = {
        ...mockProjects[0],
        services: ['WEB DEVELOPMENT', 'BRANDING']
      };
      
      const enhancedProject = enhanceProjectWithServiceDetails(projectWithServices, mockServices);
      
      // Test that the project now has serviceDetails
      expect(enhancedProject.serviceDetails).toBeDefined();
      expect(Array.isArray(enhancedProject.serviceDetails)).toBe(true);
      expect(enhancedProject.serviceDetails?.length).toBe(2);
      
      // Check that service details match the services in the project
      expect(enhancedProject.serviceDetails?.[0].title).toBe('WEB DEVELOPMENT');
      expect(enhancedProject.serviceDetails?.[1].title).toBe('BRANDING');
    });

    it('should handle projects without services', () => {
      const projectWithoutServices = { ...mockProjects[0], services: undefined };
      const enhancedProject = enhanceProjectWithServiceDetails(projectWithoutServices, mockServices);
      
      // Should return the original project with an empty serviceDetails array
      expect(enhancedProject.serviceDetails).toEqual([]);
    });

    it('should handle services not found in servicesList', () => {
      const projectWithNonExistentService = { 
        ...mockProjects[0], 
        services: ['NON-EXISTENT SERVICE'] 
      };
      
      const enhancedProject = enhanceProjectWithServiceDetails(
        projectWithNonExistentService, 
        mockServices
      );
      
      // Should still include the non-existent service with a minimal service object
      expect(enhancedProject.serviceDetails).toBeDefined();
      expect(enhancedProject.serviceDetails?.length).toBe(1);
      expect(enhancedProject.serviceDetails?.[0].title).toBe('NON-EXISTENT SERVICE');
      expect(enhancedProject.serviceDetails?.[0].description).toBe('');
    });

    it('should handle empty services arrays', () => {
      const projectWithEmptyServices = { ...mockProjects[0], services: [] };
      const enhancedProject = enhanceProjectWithServiceDetails(projectWithEmptyServices, mockServices);
      
      // Should return the original project with an empty serviceDetails array
      expect(enhancedProject.serviceDetails).toEqual([]);
    });

    it('should handle case-insensitive service matching', () => {
      const lowerCaseServiceTitle = 'web development';
      const projectWithLowerCaseService = { 
        ...mockProjects[0], 
        services: [lowerCaseServiceTitle] 
      };
      
      const enhancedProject = enhanceProjectWithServiceDetails(
        projectWithLowerCaseService, 
        mockServices
      );
      
      expect(enhancedProject.serviceDetails?.length).toBe(1);
      expect(enhancedProject.serviceDetails?.[0].title.toLowerCase()).toBe(lowerCaseServiceTitle.toLowerCase());
    });
  })
  
  describe('formatDate', () => {
    it('should format date strings correctly', () => {
      expect(formatDate('2023-01-01')).toBe('2023');
      expect(formatDate('2022-12-15')).toBe('2022');
    });
    
    it('should handle Date objects', () => {
      const date = new Date('2023-05-15');
      expect(formatDate(date)).toBe('2023');
    });
    
    it('should return empty string for invalid input', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null as unknown as string)).toBe('');
      expect(formatDate(undefined as unknown as string)).toBe('');
    });
  });
  
  describe('getFullImagePath', () => {
    it('should add the base path to relative paths', () => {
      expect(getFullImagePath('test.jpg')).toBe('/images/test.jpg');
      expect(getFullImagePath('/test.jpg')).toBe('/images/test.jpg');
    });
    
    it('should not modify absolute URLs', () => {
      const url = 'https://example.com/image.jpg';
      expect(getFullImagePath(url)).toBe(url);
    });
    
    it('should handle undefined or empty paths', () => {
      expect(getFullImagePath('')).toBe('');
      expect(getFullImagePath(undefined)).toBe('');
    });
  });
  
  describe('trimLongText', () => {
    it('should trim text longer than maxLength', () => {
      const text = 'This is a long text that should be trimmed';
      const trimmed = trimLongText(text, 10);
      expect(trimmed).toBe('This is a...');
    });
    
    it('should not trim text shorter than maxLength', () => {
      const text = 'Short text';
      expect(trimLongText(text, 20)).toBe(text);
    });
    
    it('should handle undefined or empty text', () => {
      expect(trimLongText('')).toBe('');
      expect(trimLongText(undefined)).toBe('');
    });
    
    it('should use default maxLength if not provided', () => {
      const text = 'A'.repeat(200);
      const trimmed = trimLongText(text);
      expect(trimmed.length).toBe(153); // 150 + '...'
    });
  });
}) 