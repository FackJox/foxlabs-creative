import type { Project, Service, TeamMember } from '@/lib/types';
import { mockProjects, mockServices, mockTeamMembers } from '../fixtures/mockData';

// Helper functions for data validation
const isValidProject = (project: Partial<Project>): project is Project => {
  return (
    typeof project.id === 'number' &&
    typeof project.title === 'string' &&
    typeof project.category === 'string' &&
    typeof project.year === 'string' &&
    typeof project.image === 'string' &&
    typeof project.description === 'string'
  );
};

const isValidService = (service: Partial<Service>): service is Service => {
  return (
    typeof service.title === 'string' &&
    typeof service.description === 'string'
  );
};

const isValidTeamMember = (member: Partial<TeamMember>): member is TeamMember => {
  return (
    typeof member.name === 'string' &&
    typeof member.role === 'string' &&
    typeof member.image === 'string'
  );
};

// Function to get all unique categories from projects
const getAllCategories = (projects: Project[]): string[] => {
  const categories = new Set<string>();
  projects.forEach(project => {
    categories.add(project.category.toUpperCase());
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

describe('Data Validation Utilities', () => {
  describe('isValidProject', () => {
    it('should return true for valid projects', () => {
      mockProjects.forEach(project => {
        expect(isValidProject(project)).toBe(true);
      });
    });

    it('should return false for invalid projects', () => {
      const invalidProject1 = { title: 'Test' } as Partial<Project>;
      const invalidProject2 = { id: 1, title: 'Test' } as Partial<Project>;
      const invalidProject3 = { ...mockProjects[0], id: '1' as unknown as number };

      expect(isValidProject(invalidProject1)).toBe(false);
      expect(isValidProject(invalidProject2)).toBe(false);
      expect(isValidProject(invalidProject3)).toBe(false);
    });

    it('should handle edge cases', () => {
      const emptyProject = {} as Partial<Project>;
      const nullProject = null as unknown as Partial<Project>;
      const undefinedProject = undefined as unknown as Partial<Project>;

      expect(isValidProject(emptyProject)).toBe(false);
      expect(() => isValidProject(nullProject)).toThrow();
      expect(() => isValidProject(undefinedProject)).toThrow();
    });
  });

  describe('isValidService', () => {
    it('should return true for valid services', () => {
      mockServices.forEach(service => {
        expect(isValidService(service)).toBe(true);
      });
    });

    it('should return false for invalid services', () => {
      const invalidService1 = { title: 'Test' } as Partial<Service>;
      const invalidService2 = { description: 'Test' } as Partial<Service>;
      const invalidService3 = { title: 123 as unknown as string, description: 'Test' } as Partial<Service>;

      expect(isValidService(invalidService1)).toBe(false);
      expect(isValidService(invalidService2)).toBe(false);
      expect(isValidService(invalidService3)).toBe(false);
    });

    it('should handle edge cases', () => {
      const emptyService = {} as Partial<Service>;
      const nullService = null as unknown as Partial<Service>;
      const undefinedService = undefined as unknown as Partial<Service>;

      expect(isValidService(emptyService)).toBe(false);
      expect(() => isValidService(nullService)).toThrow();
      expect(() => isValidService(undefinedService)).toThrow();
    });
  });

  describe('isValidTeamMember', () => {
    it('should return true for valid team members', () => {
      mockTeamMembers.forEach(member => {
        expect(isValidTeamMember(member)).toBe(true);
      });
    });

    it('should return false for invalid team members', () => {
      const invalidMember1 = { name: 'Test' } as Partial<TeamMember>;
      const invalidMember2 = { name: 'Test', role: 'Role' } as Partial<TeamMember>;
      const invalidMember3 = { name: 'Test', role: 'Role', image: 123 as unknown as string } as Partial<TeamMember>;

      expect(isValidTeamMember(invalidMember1)).toBe(false);
      expect(isValidTeamMember(invalidMember2)).toBe(false);
      expect(isValidTeamMember(invalidMember3)).toBe(false);
    });

    it('should handle edge cases', () => {
      const emptyMember = {} as Partial<TeamMember>;
      const nullMember = null as unknown as Partial<TeamMember>;
      const undefinedMember = undefined as unknown as Partial<TeamMember>;

      expect(isValidTeamMember(emptyMember)).toBe(false);
      expect(() => isValidTeamMember(nullMember)).toThrow();
      expect(() => isValidTeamMember(undefinedMember)).toThrow();
    });
  });

  describe('getAllCategories', () => {
    it('should return all unique categories from projects', () => {
      const categories = getAllCategories(mockProjects);
      
      // We know from our mock data that we have these categories
      expect(categories).toContain('WEBSITE');
      expect(categories).toContain('BRANDING');
      expect(categories).toContain('E-COMMERCE');
      
      // Check uniqueness
      expect(categories.length).toBe(new Set(categories).size);
      
      // Verify all categories found
      const expectedCategories = Array.from(new Set(mockProjects.map(p => p.category.toUpperCase())));
      expect(categories.sort()).toEqual(expectedCategories.sort());
    });

    it('should return an empty array for empty projects array', () => {
      expect(getAllCategories([])).toEqual([]);
    });

    it('should handle case sensitivity correctly', () => {
      // Create test data with mixed case categories
      const testProjects = [
        { ...mockProjects[0], category: 'website' },
        { ...mockProjects[1], category: 'WEBSITE' },
        { ...mockProjects[2], category: 'WebSite' }
      ] as Project[];

      const categories = getAllCategories(testProjects);
      
      // Should only have one 'WEBSITE' entry, since categories are normalized to uppercase
      expect(categories.length).toBe(1);
      expect(categories[0]).toBe('WEBSITE');
    });
  });

  describe('getAllProjectServices', () => {
    it('should return all unique services mentioned in projects', () => {
      const services = getAllProjectServices(mockProjects);
      
      // Check for expected services
      expect(services).toContain('WEB DESIGN');
      expect(services).toContain('DEVELOPMENT');
      expect(services).toContain('BRANDING');
      expect(services).toContain('PRINT DESIGN');
      expect(services).toContain('E-COMMERCE');
      
      // Check uniqueness
      expect(services.length).toBe(new Set(services).size);
      
      // Verify all services found
      const expectedServices = Array.from(new Set(
        mockProjects
          .filter(p => p.services)
          .flatMap(p => p.services!.map(s => s.toUpperCase()))
      ));
      expect(services.sort()).toEqual(expectedServices.sort());
    });

    it('should return an empty array for empty projects array', () => {
      expect(getAllProjectServices([])).toEqual([]);
    });

    it('should handle projects without services field', () => {
      // Create test data with missing services
      const testProjects = [
        { ...mockProjects[0], services: undefined },
        { ...mockProjects[1], services: [] },
        { ...mockProjects[2], services: ['TEST'] }
      ] as Project[];

      const services = getAllProjectServices(testProjects);
      
      // Should only have the 'TEST' service
      expect(services.length).toBe(1);
      expect(services[0]).toBe('TEST');
    });

    it('should handle case sensitivity correctly', () => {
      // Create test data with mixed case services
      const testProjects = [
        { ...mockProjects[0], services: ['web design'] },
        { ...mockProjects[1], services: ['WEB DESIGN'] },
        { ...mockProjects[2], services: ['Web Design'] }
      ] as Project[];

      const services = getAllProjectServices(testProjects);
      
      // Should only have one 'WEB DESIGN' entry, since services are normalized to uppercase
      expect(services.length).toBe(1);
      expect(services[0]).toBe('WEB DESIGN');
    });
  });
}); 