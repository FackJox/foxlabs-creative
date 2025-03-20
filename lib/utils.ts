import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Project, Service, TeamMember } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterProjectsByCategory = (projects: Project[], category: string): Project[] => {
  return projects.filter(
    p => p.category.toUpperCase() === category.toUpperCase()
  )
}

export const findServiceByTitle = (services: Service[], title: string): Service | undefined => {
  return services.find(
    s => s.title.toUpperCase() === title.toUpperCase()
  )
}

export const getAllCategories = (projects: Project[]): string[] => {
  const categories = new Set<string>()
  projects.forEach(project => {
    if (project.category) {
      categories.add(project.category.toUpperCase())
    }
  })
  return Array.from(categories)
}

export const getAllProjectServices = (projects: Project[]): string[] => {
  const services = new Set<string>()
  projects.forEach(project => {
    if (project.services) {
      project.services.forEach(service => {
        services.add(service.toUpperCase())
      })
    }
  })
  return Array.from(services)
}

export const isValidProject = (project: Partial<Project>): project is Project => {
  return (
    typeof project.id === 'number' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    typeof project.category === 'string' &&
    typeof project.year === 'string'
  )
}

export const isValidService = (service: Partial<Service>): service is Service => {
  return (
    typeof service.title === 'string' &&
    typeof service.description === 'string'
  )
}

export const isValidTeamMember = (member: Partial<TeamMember>): member is TeamMember => {
  return (
    typeof member.name === 'string' &&
    typeof member.role === 'string' &&
    typeof member.image === 'string'
  )
}

/**
 * Formats a project for display by transforming certain fields
 * @param project The project to format
 * @returns Formatted project with display-ready fields
 */
export const formatProjectData = (project: Project): Project => {
  return {
    ...project,
    title: project.title.toUpperCase(),
    year: project.year,
    category: project.category.toUpperCase(),
    services: project.services?.map(service => service.toUpperCase()) || [],
    // Add formatted date (for display purposes)
    formattedDate: `${project.year}`,
    // Create a summary for project cards
    summary: project.description.length > 120 
      ? `${project.description.substring(0, 120)}...` 
      : project.description
  }
}
