import { Project, Service, TeamMember } from '@/lib/types'

// Helper function to handle API responses
const handleResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(errorMessage)
  }
  
  return response.json() as Promise<T>
}

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/api/projects')
    return handleResponse<Project[]>(response, 'Failed to fetch projects')
  } catch (error) {
    // Rethrow any errors
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch projects')
  }
}

// Fetch a project by ID
export const fetchProjectById = async (id: number | string): Promise<Project> => {
  try {
    const response = await fetch(`/api/projects/${id}`)
    return handleResponse<Project>(response, `Failed to fetch project with ID ${id}`)
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch project with ID ${id}`)
  }
}

// Fetch projects by category
export const fetchProjectsByCategory = async (category: string): Promise<Project[]> => {
  try {
    const response = await fetch(`/api/projects/category/${category}`)
    return handleResponse<Project[]>(
      response, 
      `Failed to fetch projects with category ${category}`
    )
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch projects with category ${category}`)
  }
}

// Fetch all services
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch('/api/services')
    return handleResponse<Service[]>(response, 'Failed to fetch services')
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch services')
  }
}

// Fetch a service by title
export const fetchServiceByTitle = async (title: string): Promise<Service> => {
  try {
    const response = await fetch(`/api/services/${encodeURIComponent(title)}`)
    return handleResponse<Service>(
      response, 
      `Failed to fetch service with title ${title}`
    )
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch service with title ${title}`)
  }
}

// Fetch all team members
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const response = await fetch('/api/team')
    return handleResponse<TeamMember[]>(response, 'Failed to fetch team members')
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch team members')
  }
} 