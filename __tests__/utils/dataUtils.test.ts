import type { Project, Service, TeamMember } from '@/lib/types'
import { 
  filterProjectsByCategory, 
  findServiceByTitle, 
  formatProjectData,
  getAllCategories, 
  getAllProjectServices, 
  isValidProject, 
  isValidService,
  isValidTeamMember
} from '@/lib/utils'
import { mockProjects, mockServices, mockTeamMembers } from '../fixtures/mockData'

describe('Data Utility Functions', () => {
  describe('filterProjectsByCategory', () => {
    it('should filter projects by category', () => {
      const category = 'BRANDING'
      const result = filterProjectsByCategory(mockProjects, category)
      
      // Verify all results have the correct category
      expect(result.length).toBeGreaterThan(0)
      result.forEach(project => {
        expect(project.category.toUpperCase()).toBe(category.toUpperCase())
      })
      
      // Verify we got all the matching projects
      const manualFilter = mockProjects.filter(p => p.category.toUpperCase() === category.toUpperCase())
      expect(result.length).toBe(manualFilter.length)
    })
    
    it('should return an empty array if no projects match the category', () => {
      const nonExistentCategory = 'NON-EXISTENT'
      const result = filterProjectsByCategory(mockProjects, nonExistentCategory)
      
      expect(result).toEqual([])
    })
    
    it('should be case-insensitive when filtering', () => {
      // Test with lowercase
      const lowercaseCategory = 'website'
      const lowercaseResult = filterProjectsByCategory(mockProjects, lowercaseCategory)
      
      // Test with uppercase
      const uppercaseCategory = 'WEBSITE'
      const uppercaseResult = filterProjectsByCategory(mockProjects, uppercaseCategory)
      
      // Test with mixed case
      const mixedCaseCategory = 'WeBsItE'
      const mixedCaseResult = filterProjectsByCategory(mockProjects, mixedCaseCategory)
      
      // All should return the same results
      expect(lowercaseResult).toEqual(uppercaseResult)
      expect(lowercaseResult).toEqual(mixedCaseResult)
    })

    it('should handle an empty projects array', () => {
      const result = filterProjectsByCategory([], 'BRANDING')
      expect(result).toEqual([])
    })
  })
  
  describe('findServiceByTitle', () => {
    it('should find a service by title', () => {
      const serviceTitle = 'WEB DESIGN'
      const result = findServiceByTitle(mockServices, serviceTitle)
      
      expect(result).toBeDefined()
      expect(result?.title.toUpperCase()).toBe(serviceTitle.toUpperCase())
    })
    
    it('should return undefined if no service matches the title', () => {
      const nonExistentTitle = 'NON-EXISTENT'
      const result = findServiceByTitle(mockServices, nonExistentTitle)
      
      expect(result).toBeUndefined()
    })
    
    it('should be case-insensitive when finding a service', () => {
      // Test with lowercase
      const lowercaseTitle = 'web design'
      const lowercaseResult = findServiceByTitle(mockServices, lowercaseTitle)
      
      // Test with uppercase
      const uppercaseTitle = 'WEB DESIGN'
      const uppercaseResult = findServiceByTitle(mockServices, uppercaseTitle)
      
      // Test with mixed case
      const mixedCaseTitle = 'WeB DeSiGn'
      const mixedCaseResult = findServiceByTitle(mockServices, mixedCaseTitle)
      
      // All should return the same result
      expect(lowercaseResult).toEqual(uppercaseResult)
      expect(lowercaseResult).toEqual(mixedCaseResult)
    })

    it('should handle an empty services array', () => {
      const result = findServiceByTitle([], 'WEB DESIGN')
      expect(result).toBeUndefined()
    })
  })

  describe('getAllCategories', () => {
    it('should return all unique categories from projects', () => {
      const categories = getAllCategories(mockProjects)
      
      // Check for expected categories
      expect(categories).toContain('WEBSITE')
      expect(categories).toContain('BRANDING')
      expect(categories).toContain('E-COMMERCE')
      
      // Check uniqueness
      expect(categories.length).toBe(new Set(categories).size)
      
      // Verify all categories found
      const expectedCategories = Array.from(new Set(mockProjects.map(p => p.category.toUpperCase())))
      expect(categories.sort()).toEqual(expectedCategories.sort())
    })

    it('should return an empty array for empty projects array', () => {
      expect(getAllCategories([])).toEqual([])
    })

    it('should handle case sensitivity correctly', () => {
      // Create test data with mixed case categories
      const testProjects = [
        { ...mockProjects[0], category: 'website' },
        { ...mockProjects[1], category: 'WEBSITE' },
        { ...mockProjects[2], category: 'WebSite' }
      ] as Project[]

      const categories = getAllCategories(testProjects)
      
      // Should only have one 'WEBSITE' entry, since categories are normalized to uppercase
      expect(categories.length).toBe(1)
      expect(categories[0]).toBe('WEBSITE')
    })
  })

  describe('getAllProjectServices', () => {
    it('should return all unique services mentioned in projects', () => {
      const services = getAllProjectServices(mockProjects)
      
      // Check for expected services
      expect(services).toContain('WEB DESIGN')
      expect(services).toContain('DEVELOPMENT')
      expect(services).toContain('BRANDING')
      expect(services).toContain('PRINT DESIGN')
      
      // Check uniqueness
      expect(services.length).toBe(new Set(services).size)
      
      // Verify all services found
      const expectedServices = Array.from(new Set(
        mockProjects
          .filter(p => p.services)
          .flatMap(p => p.services!.map(s => s.toUpperCase()))
      ))
      expect(services.sort()).toEqual(expectedServices.sort())
    })

    it('should return an empty array for empty projects array', () => {
      expect(getAllProjectServices([])).toEqual([])
    })

    it('should handle projects without services field', () => {
      // Create test data with missing services
      const testProjects = [
        { ...mockProjects[0], services: undefined },
        { ...mockProjects[1], services: [] },
        { ...mockProjects[2], services: ['TEST'] }
      ] as Project[]

      const services = getAllProjectServices(testProjects)
      
      // Should only have the 'TEST' service
      expect(services.length).toBe(1)
      expect(services[0]).toBe('TEST')
    })

    it('should handle case sensitivity correctly', () => {
      // Create test data with mixed case services
      const testProjects = [
        { ...mockProjects[0], services: ['web design'] },
        { ...mockProjects[1], services: ['WEB DESIGN'] },
        { ...mockProjects[2], services: ['Web Design'] }
      ] as Project[]

      const services = getAllProjectServices(testProjects)
      
      // Should only have one 'WEB DESIGN' entry, since services are normalized to uppercase
      expect(services.length).toBe(1)
      expect(services[0]).toBe('WEB DESIGN')
    })
  })

  describe('isValidProject', () => {
    it('should return true for valid projects', () => {
      mockProjects.forEach(project => {
        expect(isValidProject(project)).toBe(true)
      })
    })

    it('should return false for invalid projects', () => {
      const invalidProject1 = { title: 'Test' } as Partial<Project>
      const invalidProject2 = { id: 1, title: 'Test' } as Partial<Project>
      const invalidProject3 = { ...mockProjects[0], id: '1' as unknown as number }

      expect(isValidProject(invalidProject1)).toBe(false)
      expect(isValidProject(invalidProject2)).toBe(false)
      expect(isValidProject(invalidProject3)).toBe(false)
    })

    it('should handle edge cases', () => {
      const emptyProject = {} as Partial<Project>
      
      expect(isValidProject(emptyProject)).toBe(false)
      expect(() => isValidProject(null as unknown as Partial<Project>)).toThrow()
      expect(() => isValidProject(undefined as unknown as Partial<Project>)).toThrow()
    })
  })

  describe('isValidService', () => {
    it('should return true for valid services', () => {
      mockServices.forEach(service => {
        expect(isValidService(service)).toBe(true)
      })
    })

    it('should return false for invalid services', () => {
      const invalidService1 = { title: 'Test' } as Partial<Service>
      const invalidService2 = { description: 'Test' } as Partial<Service>
      const invalidService3 = { title: 123 as unknown as string, description: 'Test' } as Partial<Service>

      expect(isValidService(invalidService1)).toBe(false)
      expect(isValidService(invalidService2)).toBe(false)
      expect(isValidService(invalidService3)).toBe(false)
    })

    it('should handle edge cases', () => {
      const emptyService = {} as Partial<Service>
      
      expect(isValidService(emptyService)).toBe(false)
      expect(() => isValidService(null as unknown as Partial<Service>)).toThrow()
      expect(() => isValidService(undefined as unknown as Partial<Service>)).toThrow()
    })
  })

  describe('isValidTeamMember', () => {
    it('should return true for valid team members', () => {
      mockTeamMembers.forEach(member => {
        expect(isValidTeamMember(member)).toBe(true)
      })
    })

    it('should return false for invalid team members', () => {
      const invalidMember1 = { name: 'Test' } as Partial<TeamMember>
      const invalidMember2 = { name: 'Test', role: 'Role' } as Partial<TeamMember>
      const invalidMember3 = { name: 'Test', role: 'Role', image: 123 as unknown as string } as Partial<TeamMember>

      expect(isValidTeamMember(invalidMember1)).toBe(false)
      expect(isValidTeamMember(invalidMember2)).toBe(false)
      expect(isValidTeamMember(invalidMember3)).toBe(false)
    })

    it('should handle edge cases', () => {
      const emptyMember = {} as Partial<TeamMember>
      
      expect(isValidTeamMember(emptyMember)).toBe(false)
      expect(() => isValidTeamMember(null as unknown as Partial<TeamMember>)).toThrow()
      expect(() => isValidTeamMember(undefined as unknown as Partial<TeamMember>)).toThrow()
    })
  })

  describe('formatProjectData', () => {
    it('should format project data correctly', () => {
      const project = mockProjects[0]
      const formatted = formatProjectData(project)
      
      // Check that all original fields are preserved
      expect(formatted.id).toBe(project.id)
      expect(formatted.image).toBe(project.image)
      
      // Check that title is uppercase
      expect(formatted.title).toBe(project.title.toUpperCase())
      
      // Check that category is uppercase
      expect(formatted.category).toBe(project.category.toUpperCase())
      
      // Check that services are uppercase
      if (project.services) {
        project.services.forEach((service, index) => {
          expect(formatted.services?.[index]).toBe(service.toUpperCase())
        })
      }
      
      // Check that formattedDate is added
      expect(formatted.formattedDate).toBe(project.year)
      
      // Check that summary is created
      expect(formatted.summary).toBeDefined()
    })
    
    it('should truncate long descriptions for summary', () => {
      // Create a test project with a long description
      const longDescription = 'A'.repeat(200)
      const testProject = {
        ...mockProjects[0],
        description: longDescription
      }
      
      const formatted = formatProjectData(testProject)
      
      // Summary should be truncated to 120 chars + '...'
      expect(formatted.summary?.length).toBe(123)
      expect(formatted.summary?.endsWith('...')).toBe(true)
    })
    
    it('should not truncate short descriptions for summary', () => {
      // Create a test project with a short description
      const shortDescription = 'Short description'
      const testProject = {
        ...mockProjects[0],
        description: shortDescription
      }
      
      const formatted = formatProjectData(testProject)
      
      // Summary should be the same as description
      expect(formatted.summary).toBe(shortDescription)
    })
    
    it('should handle projects without services', () => {
      // Create a test project without services
      const testProject = {
        ...mockProjects[0],
        services: undefined
      }
      
      const formatted = formatProjectData(testProject)
      
      // Services should be an empty array
      expect(formatted.services).toEqual([])
    })
    
    it('should preserve all other project fields', () => {
      const project = mockProjects[0]
      const formatted = formatProjectData(project)
      
      // Check that all other fields are preserved
      expect(formatted.client).toBe(project.client)
      expect(formatted.challenge).toBe(project.challenge)
      expect(formatted.solution).toBe(project.solution)
      expect(formatted.results).toBe(project.results)
      expect(formatted.testimonial).toEqual(project.testimonial)
      expect(formatted.url).toBe(project.url)
      expect(formatted.gallery).toEqual(project.gallery)
    })
  })
}) 