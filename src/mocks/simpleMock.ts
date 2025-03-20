import { projects, services } from '../../lib/data';
import type { Project, Service, TeamMember } from '../../lib/types';

// Export mock data for tests
export const mockProjects = projects;
export const mockServices = services;

// Mock team members since we only have projects and services in data.ts
export const mockTeamMembers: TeamMember[] = [
  {
    name: 'SARAH JOHNSON',
    role: 'CREATIVE DIRECTOR',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    name: 'ALEX CHEN',
    role: 'LEAD DEVELOPER',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    name: 'MARCUS WILSON',
    role: 'DESIGN LEAD',
    image: '/placeholder.svg?height=400&width=400'
  }
];

// Simple API mock
export function setupApiMock() {
  // Save original fetch
  const originalFetch = global.fetch;
  
  // Create mock fetch implementation
  global.fetch = jest.fn((url: string): Promise<Response> => {
    // Parse the URL
    const urlObj = new URL(url, 'http://localhost');
    const path = urlObj.pathname;
    
    // Handle different API routes
    if (path === '/api/projects') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockProjects)
      } as unknown as Response);
    }
    
    if (path.match(/\/api\/projects\/\d+/)) {
      const idMatch = path.match(/\/api\/projects\/(\d+)/);
      if (idMatch) {
        const id = parseInt(idMatch[1], 10);
        const project = mockProjects.find(p => p.id === id);
        
        if (project) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(project)
          } as unknown as Response);
        }
        
        return Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ error: 'Project not found' })
        } as unknown as Response);
      }
    }
    
    if (path.match(/\/api\/projects\/category\/.+/)) {
      const categoryMatch = path.match(/\/api\/projects\/category\/(.+)/);
      if (categoryMatch) {
        const category = decodeURIComponent(categoryMatch[1]);
        const filteredProjects = mockProjects.filter(
          p => p.category.toUpperCase() === category.toUpperCase()
        );
        
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(filteredProjects)
        } as unknown as Response);
      }
    }
    
    if (path === '/api/services') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockServices)
      } as unknown as Response);
    }
    
    if (path.match(/\/api\/services\/.+/)) {
      const titleMatch = path.match(/\/api\/services\/(.+)/);
      if (titleMatch) {
        const title = decodeURIComponent(titleMatch[1]);
        const service = mockServices.find(
          s => s.title.toUpperCase() === title.toUpperCase()
        );
        
        if (service) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(service)
          } as unknown as Response);
        }
        
        return Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ error: 'Service not found' })
        } as unknown as Response);
      }
    }
    
    if (path === '/api/team') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockTeamMembers)
      } as unknown as Response);
    }
    
    // Fallback for unhandled routes
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' })
    } as unknown as Response);
  });
  
  // Add a cleanup function to restore original fetch
  return () => {
    global.fetch = originalFetch;
  };
} 