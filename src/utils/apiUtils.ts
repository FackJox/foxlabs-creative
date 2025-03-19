import type { Project, Service } from '../../lib/types'

/**
 * Properly encodes URL parameters for API requests
 * @param param The parameter to encode
 * @returns The encoded parameter string
 */
export const encodeParam = (param: string): string => {
  return encodeURIComponent(param)
}

/**
 * Finds a project by its ID from a collection of projects
 * @param projects Array of projects to search
 * @param id The project ID to find
 * @returns The matching project or undefined if not found
 */
export const getProjectById = (projects: Project[], id: number): Project | undefined => {
  return projects.find(project => project.id === id)
}

/**
 * Filters projects by category name (case-insensitive)
 * @param projects Array of projects to filter
 * @param category The category to filter by
 * @returns Filtered array of projects
 */
export const filterProjectsByCategory = (projects: Project[], category: string): Project[] => {
  return projects.filter(project => 
    project.category.toUpperCase() === category.toUpperCase()
  )
}

/**
 * Finds a service by its title (case-insensitive)
 * @param services Array of services to search
 * @param title The service title to find
 * @returns The matching service or undefined if not found
 */
export const getServiceByTitle = (services: Service[], title: string): Service | undefined => {
  return services.find(service => 
    service.title.toUpperCase() === title.toUpperCase()
  )
} 