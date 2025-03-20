/**
 * Data validation utility functions
 */
import type { Project, Service, TeamMember } from '@/lib/types';

/**
 * Validates if an object is a valid Project
 * @param project The project to validate
 * @returns A type guard indicating if the project is valid
 */
export const isValidProject = (project: Partial<Project> | null | undefined): project is Project => {
  if (!project) return false;
  
  try {
    return (
      typeof project.id === 'number' &&
      typeof project.title === 'string' &&
      typeof project.description === 'string' &&
      typeof project.category === 'string' &&
      typeof project.year === 'string'
    );
  } catch (error) {
    return false;
  }
};

/**
 * Validates if an object is a valid Service
 * @param service The service to validate
 * @returns A type guard indicating if the service is valid
 */
export const isValidService = (service: Partial<Service> | null | undefined): service is Service => {
  if (!service) return false;
  
  try {
    return (
      typeof service.title === 'string' &&
      typeof service.description === 'string'
    );
  } catch (error) {
    return false;
  }
};

/**
 * Validates if an object is a valid TeamMember
 * @param member The team member to validate
 * @returns A type guard indicating if the team member is valid
 */
export const isValidTeamMember = (member: Partial<TeamMember> | null | undefined): member is TeamMember => {
  if (!member) return false;
  
  try {
    return (
      typeof member.name === 'string' &&
      typeof member.role === 'string' &&
      typeof member.image === 'string'
    );
  } catch (error) {
    return false;
  }
};

/**
 * Gets all unique categories from an array of projects
 * @param projects The projects to extract categories from
 * @returns An array of unique category names
 */
export const getAllCategories = (projects: Project[]): string[] => {
  const categories = new Set<string>();
  projects.forEach(project => {
    if (project.category) {
      categories.add(project.category.toUpperCase());
    }
  });
  return Array.from(categories);
};

/**
 * Gets all unique services mentioned across all projects
 * @param projects The projects to extract services from
 * @returns An array of unique service names
 */
export const getAllProjectServices = (projects: Project[]): string[] => {
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