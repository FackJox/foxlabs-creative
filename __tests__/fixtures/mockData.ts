import type { Project, Service, TeamMember, Testimonial } from '@/lib/types';

export const mockTestimonial: Testimonial = {
  quote: "Test quote",
  author: "Test Author",
  role: "Test Role",
  company: "Test Company"
};

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "TEST PROJECT 1",
    category: "WEBSITE",
    year: "2023",
    image: "/test1.jpg",
    description: "A test project description",
    gallery: ["/gallery1.jpg", "/gallery2.jpg"],
    client: "TEST CLIENT 1",
    services: ["WEB DESIGN", "DEVELOPMENT"],
    challenge: "Test challenge description",
    solution: "Test solution description",
    results: "Test results description",
    testimonial: mockTestimonial,
    url: "https://example.com/test1"
  },
  {
    id: 2,
    title: "TEST PROJECT 2",
    category: "BRANDING",
    year: "2022",
    image: "/test2.jpg",
    description: "Another test project description",
    gallery: ["/gallery3.jpg", "/gallery4.jpg"],
    client: "TEST CLIENT 2",
    services: ["BRANDING", "PRINT DESIGN"],
    challenge: "Test challenge description 2",
    solution: "Test solution description 2",
    results: "Test results description 2"
  },
  {
    id: 3,
    title: "TEST PROJECT 3",
    category: "E-COMMERCE",
    year: "2023",
    image: "/test3.jpg",
    description: "E-commerce test project description",
    client: "TEST CLIENT 3",
    services: ["E-COMMERCE", "WEB DESIGN", "DEVELOPMENT"]
  },
  {
    id: 4,
    title: "TEST PROJECT 4",
    category: "WEBSITE",
    year: "2021",
    image: "/test4.jpg",
    description: "Another website test project",
  }
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

export const mockServices: Service[] = [
  {
    title: "WEB DESIGN",
    description: "Test web design service description",
    benefits: ["Responsive design", "User-centered approach", "Modern aesthetics"],
    process: mockServiceProcess,
    caseStudy: mockServiceCaseStudy
  },
  {
    title: "BRANDING",
    description: "Test branding service description",
    benefits: ["Brand identity", "Logo design", "Brand guidelines"],
  },
  {
    title: "E-COMMERCE",
    description: "Test e-commerce service description",
    benefits: ["Online store", "Payment processing", "Inventory management"],
    process: mockServiceProcess
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    name: "TEST MEMBER 1",
    role: "CREATIVE DIRECTOR",
    image: "/team1.jpg"
  },
  {
    name: "TEST MEMBER 2",
    role: "LEAD DEVELOPER",
    image: "/team2.jpg"
  },
  {
    name: "TEST MEMBER 3",
    role: "DESIGNER",
    image: "/team3.jpg"
  }
];

describe('Mock Data Fixtures', () => {
  it('should have a dummy test', () => {
    expect(true).toBe(true);
  });
}); 