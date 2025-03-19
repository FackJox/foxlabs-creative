import type { Project, Service } from '@/lib/types'
import { 
  formatProjectsForListing,
  enhanceProjectWithServiceDetails,
  createDescriptionExcerpt
} from '@/src/utils/dataFormatters'
import { mockProjects, mockServices } from '../fixtures/mockData'

describe('Data Formatter Functions', () => {
  describe('formatProjectsForListing', () => {
    it('should format all projects in the array', () => {
      const formatted = formatProjectsForListing(mockProjects)
      
      // Should return the same number of projects
      expect(formatted.length).toBe(mockProjects.length)
      
      // Each project should be correctly formatted
      formatted.forEach((project, index) => {
        // Check title is uppercase
        expect(project.title).toBe(mockProjects[index].title.toUpperCase())
        
        // Check category is uppercase
        expect(project.category).toBe(mockProjects[index].category.toUpperCase())
        
        // Check preview exists
        expect(project.preview).toBeDefined()
      })
    })
    
    it('should handle empty project array', () => {
      const formatted = formatProjectsForListing([])
      expect(formatted).toEqual([])
    })
    
    it('should generate preview from description', () => {
      // Create a test project with a long description
      const longDescription = 'A'.repeat(100)
      const testProject = {
        ...mockProjects[0],
        description: longDescription
      }
      
      const [formatted] = formatProjectsForListing([testProject])
      
      // For descriptions longer than 80 chars, preview should be truncated
      expect(formatted.preview?.length).toBe(83) // 80 chars + '...'
      expect(formatted.preview?.endsWith('...')).toBe(true)
    })
    
    it('should not truncate short descriptions for preview', () => {
      // Create a test project with a short description
      const shortDescription = 'Short description'
      const testProject = {
        ...mockProjects[0],
        description: shortDescription
      }
      
      const [formatted] = formatProjectsForListing([testProject])
      
      // Preview should be the same as description
      expect(formatted.preview).toBe(shortDescription)
    })
  })
  
  describe('enhanceProjectWithServiceDetails', () => {
    it('should add service details to a project', () => {
      const project = mockProjects.find(p => p.services && p.services.length > 0)!
      const enhanced = enhanceProjectWithServiceDetails(project, mockServices)
      
      // Should add serviceDetails property
      expect(enhanced.serviceDetails).toBeDefined()
      
      // Should have the same number of service details as services
      expect(enhanced.serviceDetails?.length).toBe(project.services?.length)
      
      // Each service detail should match a service from the services array
      enhanced.serviceDetails?.forEach((detail, index) => {
        const serviceTitle = project.services![index]
        expect(detail.title.toUpperCase()).toBe(serviceTitle.toUpperCase())
      })
    })
    
    it('should handle projects without services', () => {
      const project = { ...mockProjects[0], services: undefined }
      const enhanced = enhanceProjectWithServiceDetails(project, mockServices)
      
      // Should not add serviceDetails for projects without services
      expect(enhanced).toEqual(project)
    })
    
    it('should handle projects with empty services array', () => {
      const project = { ...mockProjects[0], services: [] }
      const enhanced = enhanceProjectWithServiceDetails(project, mockServices)
      
      // Should not add serviceDetails for projects with empty services array
      expect(enhanced).toEqual(project)
    })
    
    it('should handle services that do not exist in the services array', () => {
      const project = {
        ...mockProjects[0],
        services: ['NON-EXISTENT-SERVICE']
      }
      const enhanced = enhanceProjectWithServiceDetails(project, mockServices)
      
      // Should add a placeholder service for non-existent services
      expect(enhanced.serviceDetails?.[0].title).toBe('NON-EXISTENT-SERVICE')
      expect(enhanced.serviceDetails?.[0].description).toBe('')
    })
    
    it('should be case-insensitive when matching services', () => {
      // Create test data with mixed case services
      const project = {
        ...mockProjects[0],
        services: ['web design'] // lowercase
      }
      
      const enhanced = enhanceProjectWithServiceDetails(project, mockServices)
      
      // Should find the matching service despite case differences
      const webDesignService = mockServices.find(s => s.title.toUpperCase() === 'WEB DESIGN')
      expect(enhanced.serviceDetails?.[0].description).toEqual(webDesignService?.description)
    })
  })
  
  describe('createDescriptionExcerpt', () => {
    it('should truncate long descriptions at word boundaries', () => {
      const longText = 'This is a long description that should be truncated at the appropriate word boundary to avoid cutting words in the middle'
      const excerpt = createDescriptionExcerpt(longText, 50)
      
      // Excerpt should be shorter than maxLength
      expect(excerpt.length).toBeLessThanOrEqual(53) // 50 + '...'
      
      // Excerpt should end with '...'
      expect(excerpt.endsWith('...')).toBe(true)
      
      // Excerpt should not cut words in the middle
      const lastWord = excerpt.substring(0, excerpt.length - 3).split(' ').pop()
      expect(longText.includes(` ${lastWord} `)).toBe(true)
    })
    
    it('should not truncate descriptions shorter than the max length', () => {
      const shortText = 'This is a short description'
      const excerpt = createDescriptionExcerpt(shortText, 50)
      
      // Excerpt should be the same as the input
      expect(excerpt).toBe(shortText)
    })
    
    it('should use default max length if not specified', () => {
      const longText = 'A'.repeat(200)
      const excerpt = createDescriptionExcerpt(longText)
      
      // Default max length is 100
      expect(excerpt.length).toBeLessThanOrEqual(103) // 100 + '...'
    })
    
    it('should handle descriptions without spaces', () => {
      const noSpacesText = 'Thisisatextwithoutspaces'
      const excerpt = createDescriptionExcerpt(noSpacesText, 10)
      
      // If no spaces found, should truncate at maxLength
      expect(excerpt).toBe('Thisisatex...')
    })
    
    it('should handle empty descriptions', () => {
      const emptyText = ''
      const excerpt = createDescriptionExcerpt(emptyText)
      
      // Should return empty string for empty input
      expect(excerpt).toBe('')
    })
  })
}) 