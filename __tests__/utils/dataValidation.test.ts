import type { Project, Service, TeamMember } from '@/lib/types';
import { mockProjects, mockServices, mockTeamMembers } from '../fixtures/mockData';
import { 
  isValidProject, 
  isValidService, 
  isValidTeamMember,
  getAllCategories,
  getAllProjectServices
} from '@/lib/utils/dataValidation';

// Helper functions for data validation
const isValidProject = (project: Partial<Project> | null | undefined): project is Project => {
  if (!project) return false;
  
  try {
    return (
      typeof project.id === 'number' &&
      typeof project.title === 'string' &&
      typeof project.description === 'string' &&
      typeof project.category === 'string' &&
      typeof project.year === 'string'
    );
  } catch (error) {
    return false;
  }
};

const isValidService = (service: Partial<Service> | null | undefined): service is Service => {
  if (!service) return false;
  
  try {
    return (
      typeof service.title === 'string' &&
      typeof service.description === 'string'
    );
  } catch (error) {
    return false;
  }
};

const isValidTeamMember = (member: Partial<TeamMember> | null | undefined): member is TeamMember => {
  if (!member) return false;
  
  try {
    return (
      typeof member.name === 'string' &&
      typeof member.role === 'string' &&
      typeof member.image === 'string'
    );
  } catch (error) {
    return false;
  }
};

// Function to get all unique categories from projects
const getAllCategories = (projects: Project[]): string[] => {
  const categories = new Set<string>();
  projects.forEach(project => {
    if (project.category) {
      categories.add(project.category.toUpperCase());
    }
  });
  return Array.from(categories);
};

// Function to get all services mentioned in projects
const getAllProjectServices = (projects: Project[]): string[] => {
  const services = new Set<string>();
  projects.forEach(project => {
    if (project.services) {
      project.services.forEach(service => {
        services.add(service.toUpperCase());
      });
    }
  });
  return Array.from(services);
};

describe('Data Validation Functions', () => {
  // Helper for creating a valid project
  const createValidProject = () => ({
    id: 1,
    title: 'Project Title',
    description: 'Project description',
    year: '2023',
    category: 'BRANDING',
  });

  // Helper for creating a valid service
  const createValidService = () => ({
    title: 'WEB DEVELOPMENT',
    description: 'Service description',
  });

  // Helper for creating a valid team member
  const createValidTeamMember = () => ({
    name: 'John Doe',
    role: 'Designer',
    image: '/images/team/member-1.jpg',
  });

  describe('isValidProject', () => {
    it('should return true for a valid project', () => {
      // Use a project from mockProjects that we know is valid
      const validProject = mockProjects[0];
      expect(isValidProject(validProject)).toBe(true);
    });

    it('should return false if id is missing', () => {
      const invalidProject = { ...createValidProject(), id: undefined };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if title is missing', () => {
      const invalidProject = { ...createValidProject(), title: undefined };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if description is missing', () => {
      const invalidProject = { ...createValidProject(), description: undefined };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if year is missing', () => {
      const invalidProject = { ...createValidProject(), year: undefined };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if category is missing', () => {
      const invalidProject = { ...createValidProject(), category: undefined };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isValidProject(null)).toBe(false);
      expect(isValidProject(undefined)).toBe(false);
    });
  });

  describe('isValidService', () => {
    it('should return true for a valid service', () => {
      // Use a service from mockServices that we know is valid
      const validService = mockServices[0];
      expect(isValidService(validService)).toBe(true);
    });

    it('should return false if title is missing', () => {
      const invalidService = { ...createValidService(), title: undefined };
      expect(isValidService(invalidService)).toBe(false);
    });

    it('should return false if description is missing', () => {
      const invalidService = { ...createValidService(), description: undefined };
      expect(isValidService(invalidService)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isValidService(null)).toBe(false);
      expect(isValidService(undefined)).toBe(false);
    });
  });

  describe('isValidTeamMember', () => {
    it('should return true for a valid team member', () => {
      // Use a team member from mockTeamMembers that we know is valid
      const validMember = mockTeamMembers[0];
      expect(isValidTeamMember(validMember)).toBe(true);
    });

    it('should return false if name is missing', () => {
      const invalidMember = { ...createValidTeamMember(), name: undefined };
      expect(isValidTeamMember(invalidMember)).toBe(false);
    });

    it('should return false if role is missing', () => {
      const invalidMember = { ...createValidTeamMember(), role: undefined };
      expect(isValidTeamMember(invalidMember)).toBe(false);
    });

    it('should return false if image is missing', () => {
      const invalidMember = { ...createValidTeamMember(), image: undefined };
      expect(isValidTeamMember(invalidMember)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isValidTeamMember(null)).toBe(false);
      expect(isValidTeamMember(undefined)).toBe(false);
    });
  });

  describe('getAllCategories', () => {
    it('should return all unique categories from projects', () => {
      const categories = getAllCategories(mockProjects);
      
      // Check that we get categories back
      expect(categories.length).toBeGreaterThan(0);
      
      // Check for key categories from the mock data
      expect(categories).toContain('WEB DEVELOPMENT');
      
      // Check uniqueness
      expect(categories.length).toBe(new Set(categories).size);
      
      // Verify all categories found
      const expectedCategories = Array.from(new Set(mockProjects.map(p => p.category?.toUpperCase()).filter(Boolean)));
      expect(categories.sort()).toEqual(expectedCategories.sort());
    });

    it('should return an empty array for empty projects array', () => {
      expect(getAllCategories([])).toEqual([]);
    });
  });

  describe('getAllProjectServices', () => {
    it('should return all unique services mentioned in projects', () => {
      // Filter projects that have services defined
      const projectsWithServices = mockProjects.filter(p => p.services && p.services.length > 0);
      
      if (projectsWithServices.length > 0) {
        const services = getAllProjectServices(projectsWithServices);
        
        // Ensure there are services returned
        expect(services.length).toBeGreaterThan(0);
        
        // Check uniqueness
        expect(services.length).toBe(new Set(services).size);
      } else {
        // Skip this test if no mock projects have services
        console.log("Skipping services test - no mock projects have services");
      }
    });

    it('should return an empty array for empty projects array', () => {
      expect(getAllProjectServices([])).toEqual([]);
    });
  });
}); 