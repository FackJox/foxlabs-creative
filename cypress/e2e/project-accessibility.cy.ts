describe('Project Accessibility', () => {
  beforeEach(() => {
    cy.visit('/work', { failOnStatusCode: false });
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
      // Tab through project cards
      cy.get('body').tab();
      cy.get('[data-testid="project-card"]').first().should('be.focused');
      
      // Press Enter to navigate to project detail
      cy.get('[data-testid="project-card"]').first().type('{enter}');
      cy.url().should('include', '/work/');
      
      // Press Escape to go back
      cy.get('body').type('{esc}');
      cy.url().should('include', '/work');
    });

    it('should have proper focus management', () => {
      // Click a project card
      cy.get('[data-testid="project-card"]').first().click();
      
      // Check if focus is managed properly
      cy.get('[data-testid="project-detail"]').should('be.focused');
      
      // Check if focus trap is active in modals
      cy.get('[data-testid="gallery-modal"]').then(($modal) => {
        if ($modal.length) {
          cy.get('[data-testid="gallery-modal"]').should('be.focused');
          cy.get('body').tab({ shift: true });
          cy.get('[data-testid="gallery-modal"]').should('be.focused');
        }
      });
    });
  });

  describe('Project Detail Accessibility', () => {
    beforeEach(() => {
      cy.get('[data-testid="project-card"]').first().click();
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
      // Check if animations respect reduced motion
      cy.get('[data-testid="project-card"]').first().click();
      
      // Verify page transition respects reduced motion
      cy.get('[data-testid="page-transition"]').should('have.attr', 'data-reduce-motion');
      
      // Check gallery transitions if present
      cy.get('[data-testid="gallery-transition"]').then(($transition) => {
        if ($transition.length) {
          cy.get('[data-testid="gallery-transition"]').should('have.attr', 'data-reduce-motion');
        }
      });
    });

    it('should have proper form controls', () => {
      // Check category filter if present
      cy.get('[data-testid="category-filter"]').then(($filter) => {
        if ($filter.length) {
          cy.get('[data-testid="category-filter"]').should('have.attr', 'aria-label');
          cy.get('[data-testid="category-filter"]').should('have.attr', 'role', 'combobox');
        }
      });
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