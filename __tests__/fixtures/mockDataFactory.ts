import { Project, Service, TeamMember, Testimonial, ServiceProcess, ServiceCaseStudy } from '@/lib/types';

/**
 * Factory function to create a mock Testimonial
 * @param overrides Optional partial Testimonial to override default values
 * @returns A mock Testimonial object
 */
export const createMockTestimonial = (overrides?: Partial<Testimonial>): Testimonial => ({
  quote: "FoxLabs//Creative delivered exactly what we needed—a bold, distinctive experience that sets us apart.",
  author: "Test Author",
  role: "Creative Director",
  company: "Test Company",
  ...overrides
});

/**
 * Factory function to create a mock Project with minimal required fields
 * @param overrides Optional partial Project to override default values
 * @returns A minimal mock Project object
 */
export const createMinimalProject = (overrides?: Partial<Project>): Project => ({
  id: Math.floor(Math.random() * 1000) + 1,
  title: "TEST PROJECT",
  category: "TEST CATEGORY",
  year: "2024",
  image: "/placeholder.svg?height=600&width=800",
  description: "Test project description that explains the basic concept.",
  ...overrides
});

/**
 * Factory function to create a complete mock Project with all fields
 * @param overrides Optional partial Project to override default values
 * @returns A complete mock Project object
 */
export const createMockProject = (overrides?: Partial<Project>): Project => ({
  id: Math.floor(Math.random() * 1000) + 1,
  title: "BRUTALIST TEST PROJECT",
  category: "TEST CATEGORY",
  year: "2024",
  image: "/placeholder.svg?height=600&width=800",
  description: "A comprehensive test project with all fields populated for thorough testing.",
  gallery: [
    "/placeholder.svg?height=900&width=1600",
    "/placeholder.svg?height=900&width=1600",
    "/placeholder.svg?height=900&width=1600"
  ],
  client: "TEST CLIENT",
  services: ["WEB DESIGN", "UX STRATEGY", "DEVELOPMENT"],
  challenge: "Creating a test project that covers all possible use cases and edge cases for thorough testing.",
  solution: "Implementing a comprehensive mock data factory that generates realistic test data for all scenarios.",
  results: "Improved test coverage and reliability, with more predictable and controlled test environments.",
  testimonial: createMockTestimonial(),
  url: "https://example.com/test-project",
  formattedDate: "JANUARY 2024",
  summary: "A brief summary of the test project for display in listings and previews.",
  preview: "/placeholder.svg?height=300&width=400",
  ...overrides
});

/**
 * Factory function to create multiple mock Projects
 * @param count Number of projects to create
 * @param overrides Optional partial Project to override default values for all projects
 * @param individualOverrides Optional array of partial Projects to override values for specific projects
 * @returns An array of mock Project objects
 */
export const createMockProjects = (
  count: number, 
  overrides?: Partial<Project>,
  individualOverrides?: Partial<Project>[]
): Project[] => {
  return Array.from({ length: count }, (_, index) => {
    const specificOverrides = individualOverrides && individualOverrides[index] 
      ? individualOverrides[index] 
      : {};
    
    return createMockProject({
      id: index + 1,
      title: `TEST PROJECT ${index + 1}`,
      ...overrides,
      ...specificOverrides
    });
  });
};

/**
 * Factory function to create a mock ServiceProcess
 * @param overrides Optional partial ServiceProcess to override default values
 * @returns A mock ServiceProcess object
 */
export const createMockServiceProcess = (overrides?: Partial<ServiceProcess>): ServiceProcess => ({
  title: "TEST PROCESS",
  description: "Description of a test process step for service implementation.",
  ...overrides
});

/**
 * Factory function to create multiple mock ServiceProcesses
 * @param count Number of process steps to create
 * @param overrides Optional partial ServiceProcess to override default values for all steps
 * @returns An array of mock ServiceProcess objects
 */
export const createMockServiceProcesses = (
  count: number, 
  overrides?: Partial<ServiceProcess>
): ServiceProcess[] => {
  return Array.from({ length: count }, (_, index) => {
    return createMockServiceProcess({
      title: `PROCESS ${index + 1}`,
      description: `Description of process step ${index + 1}.`,
      ...overrides
    });
  });
};

/**
 * Factory function to create a mock ServiceCaseStudy
 * @param overrides Optional partial ServiceCaseStudy to override default values
 * @returns A mock ServiceCaseStudy object
 */
export const createMockServiceCaseStudy = (overrides?: Partial<ServiceCaseStudy>): ServiceCaseStudy => ({
  title: "TEST CASE STUDY",
  description: "Description of a case study that demonstrates the service implementation.",
  image: "/placeholder.svg?height=400&width=600",
  link: "#",
  ...overrides
});

/**
 * Factory function to create a minimal mock Service with only required fields
 * @param overrides Optional partial Service to override default values
 * @returns A minimal mock Service object
 */
export const createMinimalService = (overrides?: Partial<Service>): Service => ({
  title: "TEST SERVICE",
  description: "Description of a test service with minimal required fields.",
  ...overrides
});

/**
 * Factory function to create a complete mock Service with all fields populated
 * @param overrides Optional partial Service to override default values
 * @param processCount Number of process steps to include (default: 5)
 * @returns A complete mock Service object
 */
export const createMockService = (
  overrides?: Partial<Service>,
  processCount: number = 5
): Service => ({
  title: "COMPREHENSIVE TEST SERVICE",
  description: "A comprehensive test service with all possible fields populated for testing.",
  benefits: [
    "Benefit 1 of the test service",
    "Benefit 2 of the test service",
    "Benefit 3 of the test service",
    "Benefit 4 of the test service"
  ],
  process: createMockServiceProcesses(processCount),
  caseStudy: createMockServiceCaseStudy(),
  ...overrides
});

/**
 * Factory function to create multiple mock Services
 * @param count Number of services to create
 * @param overrides Optional partial Service to override default values for all services
 * @param processCountArray Optional array specifying the number of process steps for each service
 * @returns An array of mock Service objects
 */
export const createMockServices = (
  count: number, 
  overrides?: Partial<Service>,
  processCountArray?: number[]
): Service[] => {
  return Array.from({ length: count }, (_, index) => {
    const processCount = processCountArray && processCountArray[index] 
      ? processCountArray[index] 
      : 5;
    
    return createMockService({
      title: `TEST SERVICE ${index + 1}`,
      ...overrides
    }, processCount);
  });
};

/**
 * Factory function to create a minimal mock TeamMember with only required fields
 * @param overrides Optional partial TeamMember to override default values
 * @returns A minimal mock TeamMember object
 */
export const createMinimalTeamMember = (overrides?: Partial<TeamMember>): TeamMember => ({
  name: "TEST MEMBER",
  role: "Test Role",
  image: "/placeholder.svg?height=600&width=450",
  ...overrides
});

/**
 * Factory function to create a complete mock TeamMember with extended fields
 * This assumes there might be additional fields in your implementation
 * that aren't in the base interface
 * @param overrides Optional partial TeamMember to override default values
 * @returns A complete mock TeamMember object
 */
export const createMockTeamMember = (overrides?: Partial<TeamMember>): TeamMember => ({
  name: "TEST MEMBER",
  role: "Senior Test Engineer",
  image: "/placeholder.svg?height=600&width=450",
  ...overrides
});

/**
 * Factory function to create multiple mock TeamMembers
 * @param count Number of team members to create
 * @param overrides Optional partial TeamMember to override default values for all members
 * @returns An array of mock TeamMember objects
 */
export const createMockTeamMembers = (
  count: number, 
  overrides?: Partial<TeamMember>
): TeamMember[] => {
  return Array.from({ length: count }, (_, index) => {
    return createMockTeamMember({
      name: `TEST MEMBER ${index + 1}`,
      role: index % 2 === 0 ? "Senior Developer" : "Designer",
      ...overrides
    });
  });
};

/**
 * Create test data for an entire application state
 * @returns Object containing arrays of all major data types
 */
export const createMockApplicationData = () => {
  return {
    projects: createMockProjects(5),
    services: createMockServices(3),
    teamMembers: createMockTeamMembers(4)
  };
};

// Add a dummy test for Jest to find
if (process.env.NODE_ENV === 'test') {
  describe('Mock Data Factory', () => {
    it('creates mock data correctly', () => {
      expect(createMockProject).toBeDefined();
      expect(createMockService).toBeDefined();
      expect(createMockTeamMember).toBeDefined();
      expect(createMockTestimonial).toBeDefined();
    });
  });
} 