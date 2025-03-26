import { 
  createMockProject, 
  createMockProjects, 
  createMockService, 
  createMockServices, 
  createMockTeamMember, 
  createMockTeamMembers,
  createMockTestimonial
} from './mockDataFactory';
import { Project, Service, TeamMember, Testimonial } from '@/lib/types';

// Create mock projects
export const mockProject: Project = createMockProject({
  id: 1,
  title: 'TEST PROJECT 1',
  category: 'WEB DESIGN',
  year: '2024'
});

export const mockProjects: Project[] = createMockProjects(3, {}, [
  {
    id: 1,
    title: 'TEST PROJECT 1',
    category: 'WEB DESIGN',
    year: '2024'
  },
  {
    id: 2,
    title: 'TEST PROJECT 2',
    category: 'BRANDING',
    year: '2023'
  },
  {
    id: 3,
    title: 'TEST PROJECT 3',
    category: 'MOBILE APP',
    year: '2023'
  }
]);

// Create mock services
export const mockService: Service = createMockService({
  title: 'TEST SERVICE 1'
});

export const mockServices: Service[] = createMockServices(3, {}, [4, 3, 5]);

// Create mock team members
export const mockTeamMember: TeamMember = createMockTeamMember({
  name: 'TEST TEAM MEMBER 1',
  role: 'CREATIVE DIRECTOR'
});

export const mockTeamMembers: TeamMember[] = createMockTeamMembers(3, {});

// Create mock testimonials
export const mockTestimonial: Testimonial = createMockTestimonial({
  author: 'TEST CLIENT 1',
  company: 'TEST COMPANY 1'
});

export const mockTestimonials: Testimonial[] = [
  createMockTestimonial({
    author: 'TEST CLIENT 1',
    company: 'TEST COMPANY 1',
    quote: 'Test quote 1',
    role: 'CEO'
  }),
  createMockTestimonial({
    author: 'TEST CLIENT 2',
    company: 'TEST COMPANY 2',
    quote: 'Test quote 2',
    role: 'CTO'
  }),
  createMockTestimonial({
    author: 'TEST CLIENT 3',
    company: 'TEST COMPANY 3',
    quote: 'Test quote 3',
    role: 'CMO'
  })
];

export const mockServiceProcess = [
  {
    title: "DISCOVERY",
    description: "Initial research phase"
  },
  {
    title: "DESIGN",
    description: "Creating visuals and prototypes"
  }
];

export const mockServiceCaseStudy = {
  title: "CASE STUDY",
  description: "Example case study",
  image: "/casestudy.jpg",
  link: "https://example.com/case-study"
};

// Mock Project Categories
export const mockCategories = [
  "ALL",
  "WEB DEVELOPMENT",
  "UI/UX DESIGN",
  "BRANDING",
  "E-COMMERCE"
];

// Mock Form submission result
export const mockFormSubmission = {
  success: true,
  message: "Thank you for your message. We will be in touch soon!"
};

describe('Mock Data Fixtures', () => {
  it('should have a dummy test', () => {
    expect(true).toBe(true);
  });
}); 