describe('Project Data Loading', () => {
  beforeEach(() => {
    cy.visit('/work', { failOnStatusCode: false });
  });

  describe('Project List Loading', () => {
    it('should show loading state while fetching projects', () => {
      // Intercept the projects API call
      cy.intercept('GET', '/api/projects', (req) => {
        req.reply({
          delay: 1000,
          statusCode: 200,
          body: []
        });
      });

      // Visit the projects page
      cy.visit('/work');

      // Check for loading state
      cy.get('[data-testid="project-loading"]').should('exist');
      
      // Wait for loading to complete
      cy.get('[data-testid="project-loading"]', { timeout: 2000 }).should('not.exist');
    });

    it('should handle API errors gracefully', () => {
      // Intercept the projects API call with an error
      cy.intercept('GET', '/api/projects', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      });

      // Visit the projects page
      cy.visit('/work');

      // Check for error state
      cy.get('[data-testid="project-error"]').should('exist');
      
      // Verify error message
      cy.get('[data-testid="project-error"]').should('contain', 'Failed to load projects');
      
      // Check for retry button
      cy.get('[data-testid="retry-button"]').should('exist');
    });
  });

  describe('Project Detail Loading', () => {
    it('should show loading state while fetching project details', () => {
      // Intercept the project detail API call
      cy.intercept('GET', '/api/projects/*', (req) => {
        req.reply({
          delay: 1000,
          statusCode: 200,
          body: {}
        });
      });

      // Visit a project detail page
      cy.visit('/work/1');

      // Check for loading state
      cy.get('[data-testid="project-detail-loading"]').should('exist');
      
      // Wait for loading to complete
      cy.get('[data-testid="project-detail-loading"]', { timeout: 2000 }).should('not.exist');
    });

    it('should handle non-existent project gracefully', () => {
      // Intercept the project detail API call with 404
      cy.intercept('GET', '/api/projects/999', {
        statusCode: 404,
        body: { error: 'Project not found' }
      });

      // Visit a non-existent project page
      cy.visit('/work/999');

      // Check for 404 state
      cy.get('[data-testid="project-not-found"]').should('exist');
      
      // Verify error message
      cy.get('[data-testid="project-not-found"]').should('contain', 'Project not found');
      
      // Check for back to projects link
      cy.get('[data-testid="back-to-projects"]').should('exist');
    });

    it('should handle API errors gracefully', () => {
      // Intercept the project detail API call with an error
      cy.intercept('GET', '/api/projects/1', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      });

      // Visit a project detail page
      cy.visit('/work/1');

      // Check for error state
      cy.get('[data-testid="project-detail-error"]').should('exist');
      
      // Verify error message
      cy.get('[data-testid="project-detail-error"]').should('contain', 'Failed to load project');
      
      // Check for retry button
      cy.get('[data-testid="retry-button"]').should('exist');
    });
  });

  describe('Data Validation', () => {
    it('should handle malformed project data gracefully', () => {
      // Intercept the projects API call with malformed data
      cy.intercept('GET', '/api/projects', {
        statusCode: 200,
        body: [
          {
            id: 1,
            // Missing required fields
            title: 'Invalid Project'
          }
        ]
      });

      // Visit the projects page
      cy.visit('/work');

      // Check for error state
      cy.get('[data-testid="project-error"]').should('exist');
      
      // Verify error message
      cy.get('[data-testid="project-error"]').should('contain', 'Invalid project data');
    });

    it('should handle missing optional fields gracefully', () => {
      // Intercept the project detail API call with missing optional fields
      cy.intercept('GET', '/api/projects/1', {
        statusCode: 200,
        body: {
          id: 1,
          title: 'Test Project',
          category: 'TEST',
          year: '2024',
          image: '/test.jpg',
          description: 'Test description'
          // Missing optional fields like gallery, testimonial, etc.
        }
      });

      // Visit a project detail page
      cy.visit('/work/1');

      // Verify required fields are present
      cy.get('[data-testid="project-detail"]').within(() => {
        cy.get('[data-testid="project-title"]').should('exist');
        cy.get('[data-testid="project-category"]').should('exist');
        cy.get('[data-testid="project-year"]').should('exist');
        cy.get('[data-testid="project-description"]').should('exist');
      });

      // Verify optional sections are not present
      cy.get('[data-testid="project-gallery"]').should('not.exist');
      cy.get('[data-testid="project-testimonial"]').should('not.exist');
      cy.get('[data-testid="project-url"]').should('not.exist');
    });
  });
}); 