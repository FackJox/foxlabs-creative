import { http, HttpResponse } from 'msw'
import { mockProjects, mockServices, mockTeamMembers } from './mockResponse'
import { getProjectById, filterProjectsByCategory, getServiceByTitle } from '@/lib/utils/apiUtils'

export const handlers = [
  // Get all projects
  http.get('/api/projects', () => {
    return HttpResponse.json(mockProjects, { status: 200 })
  }),
  
  // Get project by ID
  http.get('/api/projects/:id', ({ params }) => {
    const { id } = params
    const project = getProjectById(mockProjects, Number(id))
    
    if (!project) {
      return HttpResponse.json(
        { message: `Project with ID ${id} not found` },
        { status: 404 }
      )
    }
    
    return HttpResponse.json(project, { status: 200 })
  }),
  
  // Get projects by category
  http.get('/api/projects/category/:category', ({ params }) => {
    const { category } = params
    const filteredProjects = filterProjectsByCategory(mockProjects, category as string)
    
    return HttpResponse.json(filteredProjects, { status: 200 })
  }),
  
  // Get all services
  http.get('/api/services', () => {
    return HttpResponse.json(mockServices, { status: 200 })
  }),
  
  // Get service by title
  http.get('/api/services/:title', ({ params }) => {
    const { title } = params
    const service = getServiceByTitle(mockServices, title as string)
    
    if (!service) {
      return HttpResponse.json(
        { message: `Service with title ${title} not found` },
        { status: 404 }
      )
    }
    
    return HttpResponse.json(service, { status: 200 })
  }),
  
  // Get all team members
  http.get('/api/team', () => {
    return HttpResponse.json(mockTeamMembers, { status: 200 })
  })
] 