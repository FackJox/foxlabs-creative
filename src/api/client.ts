import type { Project, Service, TeamMember } from '../../lib/types'

const API_URL = '/api'

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  
  return response.json()
}

export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects/${id}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch project with id ${id}`)
  }
  
  return response.json()
}

export const fetchProjectsByCategory = async (category: string): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects/category/${encodeURIComponent(category)}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch projects in category ${category}`)
  }
  
  return response.json()
}

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_URL}/services`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch services')
  }
  
  return response.json()
}

export const fetchServiceByTitle = async (title: string): Promise<Service> => {
  const response = await fetch(`${API_URL}/services/${encodeURIComponent(title)}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch service with title ${title}`)
  }
  
  return response.json()
}

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await fetch(`${API_URL}/team`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch team members')
  }
  
  return response.json()
} 