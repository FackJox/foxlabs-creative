describe('Project Accessibility', () => {
  // Add this at the top level to handle Framer Motion errors
  Cypress.on('uncaught:exception', (err) => {
    // Return false to prevent Cypress from failing the test on animation errors
    if (err.message.includes('framer-motion') || 
        err.message.includes('motion') || 
        err.message.includes('_utils_unit_conversion_mjs') || 
        err.message.includes('positionalValues')) {
      return false;
    }
    // Allow other errors to fail the test
    return true;
  });

  beforeEach(() => {
    // Visit the work page with failOnStatusCode: false to handle any URL issues
    cy.visit('/work', { failOnStatusCode: false });
    
    // Wait for any initial animations to complete
    cy.wait(500);
  });

  describe('Project List Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      // Check main heading
      cy.get('h1').should('exist');
      
      // Check project cards have proper heading structure
      cy.get('[data-testid="project-card"]').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('h2').should('exist');
        });
      });
    });

    it('should have proper ARIA labels', () => {
      // Check project grid
      cy.get('[data-testid="project-grid"]').should('have.attr', 'aria-label', 'Projects grid');
      
      // Check project cards
      cy.get('[data-testid="project-card"]').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('[data-testid="project-image"]').should('have.attr', 'alt');
          cy.get('[data-testid="project-title"]').should('have.attr', 'aria-label');
        });
      });
    });

    it('should be keyboard navigable', () => {
      // Focus the first interactive element
      cy.get('body').focus();
      
      // Tab to find a project card
      cy.get('[data-testid="project-card"]').first().focus();
      cy.get('[data-testid="project-card"]').first().should('be.focused');
      
      // Press Enter to navigate to project detail
      cy.get('[data-testid="project-card"]').first().type('{enter}', { force: true });
      
      // Check that project detail opened
      cy.get('[data-testid="project-detail"]').should('exist');
      
      // Press Escape to go back
      cy.get('body').type('{esc}');
      
      // Check that detail is closed
      cy.get('[data-testid="project-detail"]').should('not.exist');
    });

    it('should have proper focus management', () => {
      // Click a project card
      cy.get('[data-testid="project-card"]').first().click({ force: true });
      
      // Check if focus is managed properly in the modal
      cy.get('[data-testid="project-detail"]').should('be.focused');
    });
  });

  describe('Project Detail Accessibility', () => {
    beforeEach(() => {
      // Try to click the first project card, but don't fail if it doesn't work
      cy.get('[data-testid="project-card"]').first().click({ force: true });
      
      // Now wait for the project detail to exist before proceeding
      cy.get('[data-testid="project-detail"]', { timeout: 5000 }).should('exist');
      
      // Wait for any entrance animations to complete
      cy.wait(500);
    });

    it('should have proper heading structure', () => {
      // Check main heading
      cy.get('h1').should('exist');
      
      // Check section headings
      cy.get('[data-testid="project-detail"]').within(() => {
        cy.get('h2').should('have.length.at.least', 1);
      });
    });

    it('should have proper ARIA landmarks', () => {
      // Check main content landmark
      cy.get('main').should('exist');
      
      // Check navigation landmark
      cy.get('nav').should('exist');
      
      // Check gallery landmark if present
      cy.get('[data-testid="project-gallery"]').then(($gallery) => {
        if ($gallery.length) {
          cy.get('[data-testid="project-gallery"]').should('have.attr', 'role', 'region');
          cy.get('[data-testid="project-gallery"]').should('have.attr', 'aria-label', 'Project gallery');
        }
      });
    });

    it('should have proper image descriptions', () => {
      // Check main project image
      cy.get('[data-testid="project-image"]').should('have.attr', 'alt');
      
      // Check gallery images if present
      cy.get('[data-testid="gallery-image"]').each(($image) => {
        cy.wrap($image).should('have.attr', 'alt');
      });
    });

    it('should announce dynamic content changes', () => {
      // Check gallery navigation announcements
      cy.get('[data-testid="gallery-next"]').then(($next) => {
        if ($next.length) {
          cy.get('[data-testid="gallery-next"]').click();
          cy.get('[data-testid="gallery-status"]').should('exist');
        }
      });
    });

    it('should respect reduced motion preferences', () => {
      // Verify page transition has reduced motion attributes
      cy.get('[data-testid="page-transition"]').should('have.attr', 'data-reduce-motion');
      
      // Check gallery transitions if present
      cy.get('[data-testid="gallery-transition"]').then(($transition) => {
        if ($transition.length) {
          cy.get('[data-testid="gallery-transition"]').should('have.attr', 'data-reduce-motion');
        }
      });
    });

    it('should have proper form controls', () => {
      // Check category filter buttons
      cy.get('[data-testid="category-filter"]').should('have.attr', 'aria-label');
    });

    it('should have proper error handling', () => {
      // Check error states are announced
      cy.intercept('GET', '/api/projects/*', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      });

      cy.visit('/work/999');

      cy.get('[data-testid="project-detail-error"]')
        .should('have.attr', 'role', 'alert')
        .should('have.attr', 'aria-live', 'polite');
    });
  });
}); 