import { rest } from 'msw'
import { mockProjects, mockServices, mockTeamMembers } from './mockResponse'
import { getProjectById, filterProjectsByCategory, getServiceByTitle } from '@/lib/utils/apiUtils'

export const handlers = [
  // Get all projects
  rest.get('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockProjects)
    )
  }),
  
  // Get project by ID
  rest.get('/api/projects/:id', (req, res, ctx) => {
    const { id } = req.params
    const project = getProjectById(mockProjects, Number(id))
    
    if (!project) {
      return res(
        ctx.status(404),
        ctx.json({ message: `Project with ID ${id} not found` })
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json(project)
    )
  }),
  
  // Get projects by category
  rest.get('/api/projects/category/:category', (req, res, ctx) => {
    const { category } = req.params
    const filteredProjects = filterProjectsByCategory(mockProjects, category as string)
    
    return res(
      ctx.status(200),
      ctx.json(filteredProjects)
    )
  }),
  
  // Get all services
  rest.get('/api/services', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockServices)
    )
  }),
  
  // Get service by title
  rest.get('/api/services/:title', (req, res, ctx) => {
    const { title } = req.params
    const service = getServiceByTitle(mockServices, title as string)
    
    if (!service) {
      return res(
        ctx.status(404),
        ctx.json({ message: `Service with title ${title} not found` })
      )
    }
    
    return res(
      ctx.status(200),
      ctx.json(service)
    )
  }),
  
  // Get all team members
  rest.get('/api/team', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockTeamMembers)
    )
  })
] 