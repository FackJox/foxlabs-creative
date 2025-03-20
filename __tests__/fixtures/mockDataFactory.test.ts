import {
  createMinimalProject,
  createMockProject,
  createMockProjects,
  createMinimalService,
  createMockService,
  createMockServices,
  createMinimalTeamMember,
  createMockTeamMember,
  createMockTeamMembers,
  createMockTestimonial,
  createMockServiceProcess,
  createMockServiceProcesses,
  createMockServiceCaseStudy,
  createMockApplicationData
} from './mockDataFactory';

describe('Mock Data Factory', () => {
  describe('Testimonial factory', () => {
    it('creates a testimonial with default values', () => {
      const testimonial = createMockTestimonial();
      expect(testimonial.quote).toBeDefined();
      expect(testimonial.author).toBeDefined();
      expect(testimonial.role).toBeDefined();
      expect(testimonial.company).toBeDefined();
    });

    it('allows overriding default values', () => {
      const testimonial = createMockTestimonial({
        quote: 'Custom quote',
        author: 'Custom author'
      });
      expect(testimonial.quote).toBe('Custom quote');
      expect(testimonial.author).toBe('Custom author');
      expect(testimonial.role).toBeDefined();
      expect(testimonial.company).toBeDefined();
    });
  });

  describe('Project factories', () => {
    it('creates a minimal project with required fields', () => {
      const project = createMinimalProject();
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.category).toBeDefined();
      expect(project.year).toBeDefined();
      expect(project.image).toBeDefined();
      expect(project.description).toBeDefined();
    });

    it('creates a complete project with all fields', () => {
      const project = createMockProject();
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.category).toBeDefined();
      expect(project.gallery).toBeDefined();
      expect(project.gallery.length).toBeGreaterThan(0);
      expect(project.client).toBeDefined();
      expect(project.services).toBeDefined();
      expect(project.challenge).toBeDefined();
      expect(project.solution).toBeDefined();
      expect(project.results).toBeDefined();
      expect(project.testimonial).toBeDefined();
    });

    it('creates multiple projects', () => {
      const projects = createMockProjects(3);
      expect(projects.length).toBe(3);
      projects.forEach(project => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
      });
    });

    it('allows overriding default values for all projects', () => {
      const projects = createMockProjects(2, { category: 'CUSTOM CATEGORY' });
      expect(projects.length).toBe(2);
      projects.forEach(project => {
        expect(project.category).toBe('CUSTOM CATEGORY');
      });
    });

    it('allows individual overrides for specific projects', () => {
      const projects = createMockProjects(2, 
        { year: '2023' }, 
        [{ title: 'FIRST PROJECT' }, { title: 'SECOND PROJECT' }]
      );
      expect(projects.length).toBe(2);
      expect(projects[0].title).toBe('FIRST PROJECT');
      expect(projects[1].title).toBe('SECOND PROJECT');
      projects.forEach(project => {
        expect(project.year).toBe('2023');
      });
    });
  });

  describe('Service factories', () => {
    it('creates a service process step', () => {
      const process = createMockServiceProcess();
      expect(process.title).toBeDefined();
      expect(process.description).toBeDefined();
    });

    it('creates multiple service processes', () => {
      const processes = createMockServiceProcesses(3);
      expect(processes.length).toBe(3);
      processes.forEach((process, index) => {
        expect(process.title).toBe(`PROCESS ${index + 1}`);
        expect(process.description).toBeDefined();
      });
    });

    it('creates a service case study', () => {
      const caseStudy = createMockServiceCaseStudy();
      expect(caseStudy.title).toBeDefined();
      expect(caseStudy.description).toBeDefined();
      expect(caseStudy.image).toBeDefined();
      expect(caseStudy.link).toBeDefined();
    });

    it('creates a minimal service', () => {
      const service = createMinimalService();
      expect(service.title).toBeDefined();
      expect(service.description).toBeDefined();
    });

    it('creates a complete service', () => {
      const service = createMockService();
      expect(service.title).toBeDefined();
      expect(service.description).toBeDefined();
      expect(service.benefits).toBeDefined();
      expect(service.benefits.length).toBeGreaterThan(0);
      expect(service.process).toBeDefined();
      expect(service.process.length).toBe(5); // Default value
      expect(service.caseStudy).toBeDefined();
    });

    it('creates multiple services', () => {
      const services = createMockServices(3);
      expect(services.length).toBe(3);
      services.forEach((service, index) => {
        expect(service.title).toBe(`TEST SERVICE ${index + 1}`);
      });
    });

    it('respects processCount parameter', () => {
      const service = createMockService({}, 3);
      expect(service.process.length).toBe(3);
    });

    it('allows processCount array for multiple services', () => {
      const services = createMockServices(2, {}, [3, 4]);
      expect(services.length).toBe(2);
      expect(services[0].process.length).toBe(3);
      expect(services[1].process.length).toBe(4);
    });
  });

  describe('Team Member factories', () => {
    it('creates a minimal team member', () => {
      const member = createMinimalTeamMember();
      expect(member.name).toBeDefined();
      expect(member.role).toBeDefined();
      expect(member.image).toBeDefined();
    });

    it('creates a complete team member', () => {
      const member = createMockTeamMember();
      expect(member.name).toBeDefined();
      expect(member.role).toBeDefined();
      expect(member.image).toBeDefined();
    });

    it('creates multiple team members', () => {
      const members = createMockTeamMembers(3);
      expect(members.length).toBe(3);
      members.forEach((member, index) => {
        expect(member.name).toBe(`TEST MEMBER ${index + 1}`);
        expect(member.role).toBeDefined();
      });
    });
  });

  describe('Application Data factory', () => {
    it('creates complete mock application data', () => {
      const data = createMockApplicationData();
      expect(data.projects).toBeDefined();
      expect(data.projects.length).toBeGreaterThan(0);
      expect(data.services).toBeDefined();
      expect(data.services.length).toBeGreaterThan(0);
      expect(data.teamMembers).toBeDefined();
      expect(data.teamMembers.length).toBeGreaterThan(0);
    });
  });
}); 