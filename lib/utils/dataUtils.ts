/**
 * Data utility functions for working with projects, services, and team members
 */
import type { Project, Service, TeamMember } from '@/lib/types';

/**
 * Filters projects by category
 * @param projects Array of projects to filter
 * @param category The category to filter by
 * @returns Filtered array of projects
 */
export const filterProjectsByCategory = (projects: Project[], category: string): Project[] => {
  return projects.filter(
    p => p.category.toUpperCase() === category.toUpperCase()
  );
};

/**
 * Finds a service by its title
 * @param services Array of services to search
 * @param title The title to search for
 * @returns The matched service or undefined
 */
export const findServiceByTitle = (services: Service[], title: string): Service | undefined => {
  return services.find(
    s => s.title.toUpperCase() === title.toUpperCase()
  );
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
  
  return (
    typeof service.title === 'string' &&
    typeof service.description === 'string'
  );
};

/**
 * Validates if an object is a valid TeamMember
 * @param member The team member to validate
 * @returns A type guard indicating if the team member is valid
 */
export const isValidTeamMember = (member: Partial<TeamMember> | null | undefined): member is TeamMember => {
  if (!member) return false;
  
  return (
    typeof member.name === 'string' &&
    typeof member.role === 'string' &&
    typeof member.image === 'string'
  );
};

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
  };
}; 