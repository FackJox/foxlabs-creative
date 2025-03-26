import { Project, Service, TeamMember, Testimonial } from '@/lib/types'
import { mockProjects as fixtureProjects, mockServices as fixtureServices, mockTeamMembers as fixtureTeamMembers, mockTestimonials as fixtureTestimonials } from '../../__tests__/fixtures/mockData'

// Export the same mocks from our test fixtures for consistency
export const mockProjects: Project[] = fixtureProjects;
export const mockServices: Service[] = fixtureServices;
export const mockTeamMembers: TeamMember[] = fixtureTeamMembers;
export const mockTestimonials: Testimonial[] = fixtureTestimonials;

// Any additional mock data needed specifically for MSW can go here 