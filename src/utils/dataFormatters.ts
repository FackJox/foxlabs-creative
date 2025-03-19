import type { Project, Service } from '../../lib/types'

/**
 * Formats a collection of projects for display in project listings
 * @param projects Array of projects to format
 * @returns Array of formatted projects
 */
export const formatProjectsForListing = (projects: Project[]): Project[] => {
  return projects.map(project => ({
    ...project,
    title: project.title.toUpperCase(),
    category: project.category.toUpperCase(),
    // Generate a short preview of the description
    preview: project.description.length > 80 
      ? `${project.description.substring(0, 80)}...` 
      : project.description
  }))
}

/**
 * Formats a project's services by adding related service details
 * @param project The project to enhance
 * @param allServices Array of all services to pull details from
 * @returns Project with enhanced service information
 */
export const enhanceProjectWithServiceDetails = (
  project: Project, 
  allServices: Service[]
): Project => {
  if (!project.services || project.services.length === 0) {
    return project
  }

  // Find matching service objects for each service mentioned in the project
  const serviceDetails = project.services.map(serviceTitle => {
    const matchingService = allServices.find(
      s => s.title.toUpperCase() === serviceTitle.toUpperCase()
    )
    return matchingService || { title: serviceTitle, description: '' }
  })

  return {
    ...project,
    // Add enhanced service details
    serviceDetails
  }
}

/**
 * Creates rich excerpts from project descriptions for previews
 * @param description The full project description
 * @param maxLength Maximum length of the excerpt
 * @returns Formatted excerpt
 */
export const createDescriptionExcerpt = (
  description: string, 
  maxLength: number = 100
): string => {
  if (description.length <= maxLength) {
    return description
  }
  
  // Find the last space before the maxLength to avoid cutting words
  const lastSpace = description.substring(0, maxLength).lastIndexOf(' ')
  const endPosition = lastSpace > 0 ? lastSpace : maxLength
  
  return `${description.substring(0, endPosition)}...`
} 