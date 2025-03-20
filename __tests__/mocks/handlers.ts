import { http, HttpResponse } from 'msw';
import { mockProjects, mockServices, mockTeamMembers } from '../fixtures/mockData';

// Define handlers for API endpoints
export const handlers = [
  // Projects API handlers
  http.get('/api/projects', () => {
    return HttpResponse.json(mockProjects);
  }),

  http.get('/api/projects/:id', ({ params }) => {
    const { id } = params;
    const project = mockProjects.find(p => p.id === Number(id));
    
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(project);
  }),

  http.get('/api/projects/featured', () => {
    // Return the first 3 projects as featured
    return HttpResponse.json(mockProjects.slice(0, 3));
  }),

  http.get('/api/projects/categories', () => {
    // Extract unique categories from projects
    const categories = [...new Set(mockProjects.map(p => p.category))];
    return HttpResponse.json(categories);
  }),

  http.get('/api/projects/related/:id', ({ params }) => {
    const { id } = params;
    // Return 2 related projects (different from the current one)
    const relatedProjects = mockProjects
      .filter(p => p.id !== Number(id))
      .slice(0, 2);
      
    return HttpResponse.json(relatedProjects);
  }),

  // Services API handlers
  http.get('/api/services', () => {
    return HttpResponse.json(mockServices);
  }),

  http.get('/api/services/:slug', ({ params }) => {
    const { slug } = params;
    const service = mockServices.find(s => 
      s.title.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (!service) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(service);
  }),

  http.get('/api/services/categories', () => {
    // Return service titles as categories
    const categories = mockServices.map(s => s.title);
    return HttpResponse.json(categories);
  }),

  http.get('/api/services/related/:slug', ({ params }) => {
    const { slug } = params;
    // Return other services as related (different from the current one)
    const relatedServices = mockServices
      .filter(s => s.title.toLowerCase().replace(/\s+/g, '-') !== slug)
      .slice(0, 2);
      
    return HttpResponse.json(relatedServices);
  }),

  // Team API handlers
  http.get('/api/team', () => {
    return HttpResponse.json(mockTeamMembers);
  }),

  http.get('/api/team/:id', ({ params }) => {
    const { id } = params;
    const member = mockTeamMembers.find(m => m.id === Number(id));
    
    if (!member) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(member);
  }),

  // Contact form handler
  http.post('/api/contact', async ({ request }) => {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return HttpResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Mock successful submission
    return HttpResponse.json({
      success: true,
      message: 'Form submitted successfully'
    });
  })
]; 