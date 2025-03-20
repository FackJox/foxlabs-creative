import { 
  fetchProjects, 
  fetchProjectById, 
  fetchProjectsByCategory, 
  fetchServices, 
  fetchServiceByTitle, 
  fetchTeamMembers 
} from '@/lib/api/client';
import { projects, services } from '@/lib/data';
import { TeamMember } from '@/lib/types';

// Mock team members data that matches what the API handler returns
const teamMembers: TeamMember[] = [
  {
    name: 'SARAH JOHNSON',
    role: 'CREATIVE DIRECTOR',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    name: 'ALEX CHEN',
    role: 'LEAD DEVELOPER',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    name: 'MARCUS WILSON',
    role: 'DESIGN LEAD',
    image: '/placeholder.svg?height=400&width=400'
  }
];

describe('API Client Functions', () => {
  let fetchSpy: jest.SpyInstance;
  
  beforeEach(() => {
    // Create a spy on the global fetch function
    fetchSpy = jest.spyOn(global, 'fetch');
  });
  
  afterEach(() => {
    // Restore all mocks to their original state
    jest.restoreAllMocks();
  });
  
  describe('fetchProjects', () => {
    it('should fetch all projects', async () => {
      // Mock the fetch response
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(projects)
      } as unknown as Response);
      
      // Call the function
      const result = await fetchProjects();
      
      // Check the result and that fetch was called correctly
      expect(result).toEqual(projects);
      expect(fetchSpy).toHaveBeenCalledWith('/api/projects');
    });
    
    it('should throw error on network failure', async () => {
      // Mock a network error
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw
      await expect(fetchProjects()).rejects.toThrow();
    });
    
    it('should throw error on bad response', async () => {
      // Mock a bad response
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response);
      
      // Expect the function to throw
      await expect(fetchProjects()).rejects.toThrow();
    });
  });
  
  describe('fetchProjectById', () => {
    it('should fetch a specific project by ID', async () => {
      const projectId = 1;
      const project = projects.find(p => p.id === projectId);
      
      // Mock the fetch response
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(project)
      } as unknown as Response);
      
      // Call the function
      const result = await fetchProjectById(projectId);
      
      // Check the result and that fetch was called correctly
      expect(result).toEqual(project);
      expect(fetchSpy).toHaveBeenCalledWith(`/api/projects/${projectId}`);
    });
    
    it('should throw error on network failure', async () => {
      // Mock a network error
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw
      await expect(fetchProjectById(1)).rejects.toThrow();
    });
    
    it('should throw error when project not found', async () => {
      // Mock a not found response
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response);
      
      // Expect the function to throw with specific message
      await expect(fetchProjectById(999)).rejects.toThrow('Project not found');
    });
  });
  
  describe('fetchProjectsByCategory', () => {
    it('should fetch projects by category', async () => {
      const category = 'WEBSITE';
      const filteredProjects = projects.filter(
        p => p.category.toUpperCase() === category.toUpperCase()
      );
      
      // Mock the fetch response
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(filteredProjects)
      } as unknown as Response);
      
      // Call the function
      const result = await fetchProjectsByCategory(category);
      
      // Check the result and that fetch was called correctly
      expect(result).toEqual(filteredProjects);
      expect(fetchSpy).toHaveBeenCalledWith(`/api/projects/category/${category}`);
    });
    
    it('should throw error on network failure', async () => {
      // Mock a network error
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw
      await expect(fetchProjectsByCategory('WEBSITE')).rejects.toThrow();
    });
  });
  
  describe('fetchServices', () => {
    it('should fetch all services', async () => {
      // Mock the fetch response
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(services)
      } as unknown as Response);
      
      // Call the function
      const result = await fetchServices();
      
      // Check the result and that fetch was called correctly
      expect(result).toEqual(services);
      expect(fetchSpy).toHaveBeenCalledWith('/api/services');
    });
    
    it('should throw error on network failure', async () => {
      // Mock a network error
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw
      await expect(fetchServices()).rejects.toThrow();
    });
  });
  
  describe('fetchServiceByTitle', () => {
    it('should fetch a specific service by title', async () => {
      const title = 'WEB DESIGN';
      const service = services.find(s => s.title.toUpperCase() === title.toUpperCase());
      
      // Mock the fetch response
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(service)
      } as unknown as Response);
      
      // Call the function
      const result = await fetchServiceByTitle(title);
      
      // Check the result and that fetch was called correctly
      expect(result).toEqual(service);
      expect(fetchSpy).toHaveBeenCalledWith(`/api/services/${encodeURIComponent(title)}`);
    });
    
    it('should throw error on network failure', async () => {
      // Mock a network error
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw
      await expect(fetchServiceByTitle('WEB DESIGN')).rejects.toThrow();
    });
    
    it('should throw error when service not found', async () => {
      // Mock a not found response
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response);
      
      // Expect the function to throw with specific message
      await expect(fetchServiceByTitle('NONEXISTENT')).rejects.toThrow('Service not found');
    });
  });
  
  describe('fetchTeamMembers', () => {
    it('should fetch all team members', async () => {
      // Mock the fetch response
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(teamMembers)
      } as unknown as Response);
      
      // Call the function
      const result = await fetchTeamMembers();
      
      // Check the result and that fetch was called correctly
      expect(result).toEqual(teamMembers);
      expect(fetchSpy).toHaveBeenCalledWith('/api/team');
    });
    
    it('should throw error on network failure', async () => {
      // Mock a network error
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
      
      // Expect the function to throw
      await expect(fetchTeamMembers()).rejects.toThrow();
    });
  });
}); 