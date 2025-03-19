import { fetchProjects, fetchProjectById, fetchProjectsByCategory, fetchServices, fetchServiceByTitle, fetchTeamMembers } from '@/src/api/client';
import { setupApiMock } from '@/src/mocks/simpleMock';
import { projects, services } from '@/lib/data';
import type { Project, Service, TeamMember } from '@/lib/types';

describe('API Client Functions', () => {
  let originalFetch: any;
  let cleanupMock: () => void;

  beforeAll(() => {
    // Store the original fetch
    originalFetch = global.fetch;
    // Setup the API mock
    cleanupMock = setupApiMock();
  });

  afterAll(() => {
    // Restore the original fetch after all tests
    cleanupMock();
  });

  beforeEach(() => {
    // Ensure fetch is using our mock implementation before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Reset mocks after each test
    jest.resetAllMocks();
  });

  describe('fetchProjects', () => {
    it('should fetch all projects', async () => {
      const result = await fetchProjects();
      expect(result).toEqual(projects);
    });

    it('should throw an error if the request fails', async () => {
      // Set the global error simulation flag
      global.__simulateFetchError__ = true;
      
      try {
        await expect(fetchProjects()).rejects.toThrow('Failed to fetch projects');
      } finally {
        // Reset the flag after test
        global.__simulateFetchError__ = false;
      }
    });
  });

  describe('fetchProjectById', () => {
    it('should fetch a project by ID', async () => {
      const projectId = 1;
      const expectedProject = projects.find(p => p.id === projectId);
      
      const result = await fetchProjectById(projectId);
      expect(result).toEqual(expectedProject);
    });

    it('should throw an error if the project is not found', async () => {
      const nonExistentId = 9999;
      
      try {
        await fetchProjectById(nonExistentId);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect((error as Error).message).toContain(`Failed to fetch project with id ${nonExistentId}`);
      }
    });
  });

  describe('fetchProjectsByCategory', () => {
    it('should fetch projects filtered by category', async () => {
      const category = 'BRANDING';
      const expectedProjects = projects.filter(
        p => p.category.toUpperCase() === category.toUpperCase()
      );
      
      const result = await fetchProjectsByCategory(category);
      expect(result).toEqual(expectedProjects);
    });

    it('should return an empty array if no projects match the category', async () => {
      const nonExistentCategory = 'NON-EXISTENT';
      
      const result = await fetchProjectsByCategory(nonExistentCategory);
      expect(result).toEqual([]);
    });

    it('should handle URL encoding for categories with special characters', async () => {
      // Test by verifying the result matches what we'd expect
      const category = 'WEB APP';
      const expectedProjects = projects.filter(
        p => p.category.toUpperCase() === category.toUpperCase()
      );
      
      const result = await fetchProjectsByCategory(category);
      expect(result).toEqual(expectedProjects);
    });
  });

  describe('fetchServices', () => {
    it('should fetch all services', async () => {
      const result = await fetchServices();
      expect(result).toEqual(services);
    });

    it('should throw an error if the request fails', async () => {
      // Set the global error simulation flag
      global.__simulateFetchError__ = true;
      
      try {
        await expect(fetchServices()).rejects.toThrow('Failed to fetch services');
      } finally {
        // Reset the flag after test
        global.__simulateFetchError__ = false;
      }
    });
  });

  describe('fetchServiceByTitle', () => {
    it('should fetch a service by title', async () => {
      const serviceTitle = 'WEB DESIGN';
      const expectedService = services.find(
        s => s.title.toUpperCase() === serviceTitle.toUpperCase()
      );
      
      const result = await fetchServiceByTitle(serviceTitle);
      expect(result).toEqual(expectedService);
    });

    it('should throw an error if the service is not found', async () => {
      const nonExistentTitle = 'NON-EXISTENT';
      
      try {
        await fetchServiceByTitle(nonExistentTitle);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect((error as Error).message).toContain(`Failed to fetch service with title ${nonExistentTitle}`);
      }
    });

    it('should handle URL encoding for titles with special characters', async () => {
      // Test by verifying the result matches what we'd expect
      const title = 'DIGITAL MARKETING';
      const expectedService = services.find(
        s => s.title.toUpperCase() === title.toUpperCase()
      );
      
      const result = await fetchServiceByTitle(title);
      expect(result).toEqual(expectedService);
    });
  });

  describe('fetchTeamMembers', () => {
    it('should fetch all team members', async () => {
      const result = await fetchTeamMembers();
      // We can't directly compare with the data.ts file since teamMembers are defined in the mock
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('role');
      expect(result[0]).toHaveProperty('image');
    });

    it('should throw an error if the request fails', async () => {
      // Set the global error simulation flag
      global.__simulateFetchError__ = true;
      
      try {
        await expect(fetchTeamMembers()).rejects.toThrow('Failed to fetch team members');
      } finally {
        // Reset the flag after test
        global.__simulateFetchError__ = false;
      }
    });
  });
}); 