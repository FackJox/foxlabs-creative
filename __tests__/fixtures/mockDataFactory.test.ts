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
  describe('Project Factory', () => {
    it('creates a minimal project with required fields', () => {
      const project = createMinimalProject();
      
      expect(project).toBeDefined();
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.category).toBeDefined();
      expect(project.year).toBeDefined();
      expect(project.image).toBeDefined();
      expect(project.description).toBeDefined();
    });

    it('creates a complete project with all fields', () => {
      const project = createMockProject();
      
      expect(project).toBeDefined();
      expect(project.id).toBeDefined();
      expect(project.gallery).toBeDefined();
      expect(project.gallery?.length).toBeGreaterThan(0);
      expect(project.client).toBeDefined();
      expect(project.services).toBeDefined();
      expect(project.challenge).toBeDefined();
      expect(project.solution).toBeDefined();
      expect(project.results).toBeDefined();
      expect(project.testimonial).toBeDefined();
      expect(project.url).toBeDefined();
    });

    it('allows overriding specific fields', () => {
      const customTitle = 'CUSTOM PROJECT TITLE';
      const customCategory = 'CUSTOM CATEGORY';
      
      const project = createMockProject({
        title: customTitle,
        category: customCategory
      });
      
      expect(project.title).toBe(customTitle);
      expect(project.category).toBe(customCategory);
    });

    it('creates multiple projects', () => {
      const count = 5;
      const projects = createMockProjects(count);
      
      expect(projects).toHaveLength(count);
      expect(projects[0].id).toBe(1);
      expect(projects[1].id).toBe(2);
    });

    it('supports individual overrides for multiple projects', () => {
      const projects = createMockProjects(3, 
        { client: 'SHARED CLIENT' },
        [
          { title: 'FIRST PROJECT' },
          { title: 'SECOND PROJECT' },
          { title: 'THIRD PROJECT' }
        ]
      );
      
      expect(projects).toHaveLength(3);
      expect(projects[0].client).toBe('SHARED CLIENT');
      expect(projects[1].client).toBe('SHARED CLIENT');
      expect(projects[2].client).toBe('SHARED CLIENT');
      
      expect(projects[0].title).toBe('FIRST PROJECT');
      expect(projects[1].title).toBe('SECOND PROJECT');
      expect(projects[2].title).toBe('THIRD PROJECT');
    });
  });

  describe('Service Factory', () => {
    it('creates a minimal service with required fields', () => {
      const service = createMinimalService();
      
      expect(service).toBeDefined();
      expect(service.title).toBeDefined();
      expect(service.description).toBeDefined();
    });

    it('creates a complete service with all fields', () => {
      const service = createMockService();
      
      expect(service).toBeDefined();
      expect(service.benefits).toBeDefined();
      expect(service.benefits?.length).toBeGreaterThan(0);
      expect(service.process).toBeDefined();
      expect(service.process?.length).toBe(5); // Default count
      expect(service.caseStudy).toBeDefined();
    });

    it('allows specifying process step count', () => {
      const processCount = 3;
      const service = createMockService({}, processCount);
      
      expect(service.process).toHaveLength(processCount);
    });

    it('creates multiple services', () => {
      const count = 3;
      const services = createMockServices(count);
      
      expect(services).toHaveLength(count);
      expect(services[0].title).toBe('TEST SERVICE 1');
      expect(services[1].title).toBe('TEST SERVICE 2');
    });

    it('supports varying process step counts for multiple services', () => {
      const services = createMockServices(3, {}, [2, 4, 6]);
      
      expect(services[0].process).toHaveLength(2);
      expect(services[1].process).toHaveLength(4);
      expect(services[2].process).toHaveLength(6);
    });
  });

  describe('Team Member Factory', () => {
    it('creates a minimal team member', () => {
      const member = createMinimalTeamMember();
      
      expect(member).toBeDefined();
      expect(member.name).toBeDefined();
      expect(member.role).toBeDefined();
      expect(member.image).toBeDefined();
    });

    it('creates a complete team member', () => {
      const member = createMockTeamMember();
      
      expect(member).toBeDefined();
      expect(member.name).toBeDefined();
      expect(member.role).toBeDefined();
      expect(member.image).toBeDefined();
    });

    it('allows overriding specific fields', () => {
      const customName = 'CUSTOM NAME';
      const customRole = 'Custom Role';
      
      const member = createMockTeamMember({
        name: customName,
        role: customRole
      });
      
      expect(member.name).toBe(customName);
      expect(member.role).toBe(customRole);
    });

    it('creates multiple team members', () => {
      const count = 4;
      const members = createMockTeamMembers(count);
      
      expect(members).toHaveLength(count);
      expect(members[0].name).toBe('TEST MEMBER 1');
      expect(members[1].name).toBe('TEST MEMBER 2');
      
      // Check alternating roles
      expect(members[0].role).toBe('Senior Developer');
      expect(members[1].role).toBe('Designer');
    });
  });

  describe('Supporting Type Factories', () => {
    it('creates testimonials', () => {
      const testimonial = createMockTestimonial();
      
      expect(testimonial).toBeDefined();
      expect(testimonial.quote).toBeDefined();
      expect(testimonial.author).toBeDefined();
      expect(testimonial.role).toBeDefined();
      expect(testimonial.company).toBeDefined();
    });

    it('creates service process steps', () => {
      const process = createMockServiceProcess();
      
      expect(process).toBeDefined();
      expect(process.title).toBeDefined();
      expect(process.description).toBeDefined();
    });

    it('creates multiple service process steps', () => {
      const count = 3;
      const processes = createMockServiceProcesses(count);
      
      expect(processes).toHaveLength(count);
      expect(processes[0].title).toBe('PROCESS 1');
      expect(processes[1].title).toBe('PROCESS 2');
    });

    it('creates service case studies', () => {
      const caseStudy = createMockServiceCaseStudy();
      
      expect(caseStudy).toBeDefined();
      expect(caseStudy.title).toBeDefined();
      expect(caseStudy.description).toBeDefined();
      expect(caseStudy.image).toBeDefined();
      expect(caseStudy.link).toBeDefined();
    });
  });

  describe('Application Data Factory', () => {
    it('creates a complete set of application data', () => {
      const appData = createMockApplicationData();
      
      expect(appData).toBeDefined();
      expect(appData.projects).toBeDefined();
      expect(appData.projects.length).toBe(5);
      expect(appData.services).toBeDefined();
      expect(appData.services.length).toBe(3);
      expect(appData.teamMembers).toBeDefined();
      expect(appData.teamMembers.length).toBe(4);
    });
  });
}); 