import { http, HttpResponse } from 'msw'
import { projects, services } from '../../lib/data'
import type { Project, Service, TeamMember } from '../../lib/types'

// Mock team members since we only have projects and services in data.ts
const teamMembers: TeamMember[] = [
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
]

export const handlers = [
  // Handler for fetching all projects
  http.get('/api/projects', () => {
    return HttpResponse.json(projects)
  }),

  // Handler for fetching a single project by ID
  http.get('/api/projects/:id', ({ params }) => {
    const { id } = params
    const project = projects.find(p => p.id === Number(id))
    
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(project)
  }),

  // Handler for fetching projects by category
  http.get('/api/projects/category/:category', ({ params }) => {
    const { category } = params
    if (!category) {
      return new HttpResponse(null, { status: 400 })
    }
    
    const filteredProjects = projects.filter(
      p => p.category.toUpperCase() === category.toString().toUpperCase()
    )
    
    return HttpResponse.json(filteredProjects)
  }),

  // Handler for fetching all services
  http.get('/api/services', () => {
    return HttpResponse.json(services)
  }),

  // Handler for fetching a single service by title
  http.get('/api/services/:title', ({ params }) => {
    const { title } = params
    if (!title) {
      return new HttpResponse(null, { status: 400 })
    }
    
    const service = services.find(
      s => s.title.toUpperCase() === title.toString().toUpperCase()
    )
    
    if (!service) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(service)
  }),

  // Handler for fetching all team members
  http.get('/api/team', () => {
    return HttpResponse.json(teamMembers)
  })
]
