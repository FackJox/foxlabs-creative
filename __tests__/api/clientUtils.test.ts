import type { Project, Service } from '@/lib/types'
import { mockProjects, mockServices } from '../fixtures/mockData'

// Helper function to encode URL parameters properly
export const encodeParam = (param: string): string => {
  return encodeURIComponent(param)
}

// Helper function to extract project from a collection based on ID
export const getProjectById = (projects: Project[], id: number): Project | undefined => {
  return projects.find(project => project.id === id)
}

// Helper function to filter projects by category
export const filterProjectsByCategory = (projects: Project[], category: string): Project[] => {
  return projects.filter(project => 
    project.category.toUpperCase() === category.toUpperCase()
  )
}

// Helper function to find a service by its title
export const getServiceByTitle = (services: Service[], title: string): Service | undefined => {
  return services.find(service => 
    service.title.toUpperCase() === title.toUpperCase()
  )
}

describe('API Client Utility Functions', () => {
  describe('encodeParam', () => {
    it('should encode URL parameters correctly', () => {
      expect(encodeParam('Web Design')).toBe('Web%20Design')
      expect(encodeParam('UX/UI')).toBe('UX%2FUI')
      expect(encodeParam('Digital & Print')).toBe('Digital%20%26%20Print')
    })

    it('should handle special characters', () => {
      expect(encodeParam('100% Brutalist')).toBe('100%25%20Brutalist')
      expect(encodeParam('Q&A')).toBe('Q%26A')
    })

    it('should handle empty strings', () => {
      expect(encodeParam('')).toBe('')
    })
  })

  describe('getProjectById', () => {
    it('should find a project by ID', () => {
      const projectId = 1
      const result = getProjectById(mockProjects, projectId)
      
      expect(result).toBeDefined()
      expect(result?.id).toBe(projectId)
    })

    it('should return undefined for non-existent project IDs', () => {
      const nonExistentId = 9999
      const result = getProjectById(mockProjects, nonExistentId)
      
      expect(result).toBeUndefined()
    })

    it('should handle an empty projects array', () => {
      expect(getProjectById([], 1)).toBeUndefined()
    })
  })

  describe('filterProjectsByCategory', () => {
    it('should filter projects by category', () => {
      const category = 'WEBSITE'
      const result = filterProjectsByCategory(mockProjects, category)
      
      expect(result.length).toBeGreaterThan(0)
      result.forEach(project => {
        expect(project.category.toUpperCase()).toBe(category)
      })
    })

    it('should be case-insensitive', () => {
      const lowercaseResult = filterProjectsByCategory(mockProjects, 'website')
      const uppercaseResult = filterProjectsByCategory(mockProjects, 'WEBSITE')
      
      expect(lowercaseResult).toEqual(uppercaseResult)
    })

    it('should return an empty array for non-existent categories', () => {
      expect(filterProjectsByCategory(mockProjects, 'NON-EXISTENT')).toEqual([])
    })
  })

  describe('getServiceByTitle', () => {
    it('should find a service by title', () => {
      const serviceTitle = 'WEB DESIGN'
      const result = getServiceByTitle(mockServices, serviceTitle)
      
      expect(result).toBeDefined()
      expect(result?.title.toUpperCase()).toBe(serviceTitle.toUpperCase())
    })

    it('should be case-insensitive', () => {
      const lowercaseResult = getServiceByTitle(mockServices, 'web design')
      const uppercaseResult = getServiceByTitle(mockServices, 'WEB DESIGN')
      
      expect(lowercaseResult).toEqual(uppercaseResult)
    })

    it('should return undefined for non-existent service titles', () => {
      expect(getServiceByTitle(mockServices, 'NON-EXISTENT')).toBeUndefined()
    })

    it('should handle an empty services array', () => {
      expect(getServiceByTitle([], 'WEB DESIGN')).toBeUndefined()
    })
  })
}) 