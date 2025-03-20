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
} from '@/lib/utils/dataUtils'
import { mockProjects, mockServices, mockTeamMembers } from '../fixtures/mockData'

describe('Data Utility Functions', () => {
  describe('filterProjectsByCategory', () => {
    it('should filter projects by category', () => {
      const category = 'WEB DEVELOPMENT'
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
      const lowercaseCategory = 'web development'
      const lowercaseResult = filterProjectsByCategory(mockProjects, lowercaseCategory)
      
      // Test with uppercase
      const uppercaseCategory = 'WEB DEVELOPMENT'
      const uppercaseResult = filterProjectsByCategory(mockProjects, uppercaseCategory)
      
      // Test with mixed case
      const mixedCaseCategory = 'WeB DeVeLoPmEnT'
      const mixedCaseResult = filterProjectsByCategory(mockProjects, mixedCaseCategory)
      
      // All should return the same results
      expect(lowercaseResult).toEqual(uppercaseResult)
      expect(lowercaseResult).toEqual(mixedCaseResult)
    })

    it('should handle an empty projects array', () => {
      const result = filterProjectsByCategory([], 'WEB DEVELOPMENT')
      expect(result).toEqual([])
    })
  })
  
  describe('findServiceByTitle', () => {
    it('should find a service by title', () => {
      const serviceTitle = 'WEB DEVELOPMENT'
      const service = findServiceByTitle(mockServices, serviceTitle)
      
      expect(service).toBeDefined()
      expect(service?.title.toUpperCase()).toBe(serviceTitle.toUpperCase())
    })
    
    it('should be case-insensitive', () => {
      const serviceTitle = 'web development'
      const service = findServiceByTitle(mockServices, serviceTitle)
      
      expect(service).toBeDefined()
      expect(service?.title.toUpperCase()).toBe(serviceTitle.toUpperCase())
    })
    
    it('should return undefined for non-existent title', () => {
      const service = findServiceByTitle(mockServices, 'NON-EXISTENT SERVICE')
      expect(service).toBeUndefined()
    })
    
    it('should handle empty array', () => {
      const service = findServiceByTitle([], 'WEB DEVELOPMENT')
      expect(service).toBeUndefined()
    })
  })

  describe('getAllCategories', () => {
    it('should return all unique categories from projects', () => {
      const categories = getAllCategories(mockProjects)
      
      // We expect categories to include at least WEB DEVELOPMENT
      expect(categories).toContain('WEB DEVELOPMENT')
      
      // Check that the categories are unique
      const uniqueCategories = Array.from(new Set(mockProjects.map(p => p.category.toUpperCase())))
      expect(categories.length).toBe(uniqueCategories.length)
      
      // Check that all categories from mockProjects are included
      uniqueCategories.forEach(category => {
        expect(categories).toContain(category)
      })
    })
    
    it('should handle empty projects array', () => {
      const categories = getAllCategories([])
      expect(categories).toEqual([])
    })
  })

  describe('getAllProjectServices', () => {
    it('should return all unique services from projects', () => {
      // Filter projects with services defined
      const projectsWithServices = mockProjects.filter(p => p.services && p.services.length > 0)
      
      if (projectsWithServices.length > 0) {
        const services = getAllProjectServices(projectsWithServices)
        
        // Expect at least one service to be returned
        expect(services.length).toBeGreaterThan(0)
        
        // Check that service names are unique
        const allServiceNames = projectsWithServices
          .flatMap(p => p.services || [])
          .filter(Boolean)
          .map(s => s.toUpperCase())
        const uniqueServiceNames = [...new Set(allServiceNames)]
        expect(services.length).toBe(uniqueServiceNames.length)
      } else {
        console.log("Skipping services test - no mock projects have services")
      }
    })
    
    it('should handle projects without services', () => {
      const projectsWithoutServices = mockProjects.map(p => ({ ...p, services: undefined }))
      const services = getAllProjectServices(projectsWithoutServices)
      expect(services).toEqual([])
    })
    
    it('should handle empty projects array', () => {
      const services = getAllProjectServices([])
      expect(services).toEqual([])
    })
  })

  describe('isValidProject', () => {
    it('should return true for valid projects', () => {
      // Use a known valid project from mockProjects
      const validProject = mockProjects[0]
      expect(isValidProject(validProject)).toBe(true)
    })
    
    it('should return false for invalid projects', () => {
      const invalidProject1 = { title: 'Test' } as Partial<Project>
      const invalidProject2 = { id: 123, title: 'Test' } as Partial<Project>
      
      expect(isValidProject(invalidProject1)).toBe(false)
      expect(isValidProject(invalidProject2)).toBe(false)
    })
    
    it('should handle null or undefined', () => {
      expect(isValidProject(null)).toBe(false)
      expect(isValidProject(undefined)).toBe(false)
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

      expect(isValidService(invalidService1)).toBe(false)
      expect(isValidService(invalidService2)).toBe(false)
    })

    it('should handle null or undefined', () => {
      expect(isValidService(null)).toBe(false)
      expect(isValidService(undefined)).toBe(false)
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

      expect(isValidTeamMember(invalidMember1)).toBe(false)
      expect(isValidTeamMember(invalidMember2)).toBe(false)
    })

    it('should handle null or undefined', () => {
      expect(isValidTeamMember(null)).toBe(false)
      expect(isValidTeamMember(undefined)).toBe(false)
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