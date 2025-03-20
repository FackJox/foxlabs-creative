describe('Project Interactions', () => {
  beforeEach(() => {
    cy.visit('/work', { failOnStatusCode: false });
  });

  describe('Project List View', () => {
    it('should display all projects in a grid', () => {
      // Check if project grid exists
      cy.get('[data-testid="project-grid"]').should('exist');
      
      // Verify multiple project cards are displayed
      cy.get('[data-testid="project-card"]').should('have.length.greaterThan', 1);
      
      // Check if each project card has required elements
      cy.get('[data-testid="project-card"]').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('[data-testid="project-image"]').should('exist');
          cy.get('[data-testid="project-title"]').should('exist');
          cy.get('[data-testid="project-category"]').should('exist');
          cy.get('[data-testid="project-year"]').should('exist');
        });
      });
    });

    it('should filter projects by category', () => {
      // Get initial project count
      cy.get('[data-testid="project-card"]').then(($cards) => {
        const initialCount = $cards.length;
        
        // Click a category filter
        cy.get('[data-testid="category-filter"]').first().click();
        
        // Verify filtered projects
        cy.get('[data-testid="project-card"]').should('have.length.lessThan', initialCount);
        
        // Verify all displayed projects match the selected category
        cy.get('[data-testid="project-card"]').each(($card) => {
          cy.wrap($card).within(() => {
            cy.get('[data-testid="project-category"]').should('contain', 'E-COMMERCE');
          });
        });
      });
    });

    it('should clear category filter', () => {
      // Click a category filter
      cy.get('[data-testid="category-filter"]').first().click();
      
      // Click clear filter button
      cy.get('[data-testid="clear-filter"]').click();
      
      // Verify all projects are shown again
      cy.get('[data-testid="project-card"]').should('have.length.greaterThan', 1);
    });
  });

  describe('Project Detail View', () => {
    it('should navigate to project detail page', () => {
      // Click first project card
      cy.get('[data-testid="project-card"]').first().click();
      
      // Verify URL includes project ID
      cy.url().should('include', '/work/');
      
      // Check project detail elements
      cy.get('[data-testid="project-detail"]').within(() => {
        cy.get('[data-testid="project-title"]').should('exist');
        cy.get('[data-testid="project-category"]').should('exist');
        cy.get('[data-testid="project-year"]').should('exist');
        cy.get('[data-testid="project-description"]').should('exist');
        cy.get('[data-testid="project-challenge"]').should('exist');
        cy.get('[data-testid="project-solution"]').should('exist');
        cy.get('[data-testid="project-results"]').should('exist');
      });
    });

    it('should display project gallery', () => {
      // Navigate to project detail
      cy.get('[data-testid="project-card"]').first().click();
      
      // Check gallery elements
      cy.get('[data-testid="project-gallery"]').should('exist');
      cy.get('[data-testid="gallery-image"]').should('have.length.greaterThan', 1);
      
      // Test gallery navigation
      cy.get('[data-testid="gallery-next"]').click();
      cy.get('[data-testid="gallery-image"]').should('be.visible');
      
      cy.get('[data-testid="gallery-prev"]').click();
      cy.get('[data-testid="gallery-image"]').should('be.visible');
    });

    it('should display project testimonial if available', () => {
      // Navigate to project detail
      cy.get('[data-testid="project-card"]').first().click();
      
      // Check testimonial section
      cy.get('[data-testid="project-testimonial"]').within(() => {
        cy.get('[data-testid="testimonial-quote"]').should('exist');
        cy.get('[data-testid="testimonial-author"]').should('exist');
        cy.get('[data-testid="testimonial-role"]').should('exist');
        cy.get('[data-testid="testimonial-company"]').should('exist');
      });
    });

    it('should handle external project links', () => {
      // Navigate to project detail
      cy.get('[data-testid="project-card"]').first().click();
      
      // Check if external link exists
      cy.get('[data-testid="project-url"]').then(($link) => {
        if ($link.length) {
          // Verify link opens in new tab
          cy.wrap($link).should('have.attr', 'target', '_blank');
          cy.wrap($link).should('have.attr', 'rel', 'noopener noreferrer');
        }
      });
    });

    it('should navigate back to project list', () => {
      // Navigate to project detail
      cy.get('[data-testid="project-card"]').first().click();
      
      // Click back to projects link
      cy.get('[data-testid="back-to-projects"]').click();
      
      // Verify URL and project list
      cy.url().should('include', '/work');
      cy.get('[data-testid="project-grid"]').should('exist');
    });
  });

  describe('Animations and Transitions', () => {
    it('should complete page transitions smoothly', () => {
      // Navigate to project detail
      cy.get('[data-testid="project-card"]').first().click();
      
      // Verify page transition animation
      cy.get('[data-testid="page-transition"]').should('exist');
      
      // Wait for animation to complete
      cy.get('[data-testid="page-transition"]', { timeout: 1000 }).should('not.exist');
    });

    it('should animate gallery transitions', () => {
      // Navigate to project detail
      cy.get('[data-testid="project-card"]').first().click();
      
      // Click next in gallery
      cy.get('[data-testid="gallery-next"]').click();
      
      // Verify gallery transition
      cy.get('[data-testid="gallery-transition"]').should('exist');
      
      // Wait for transition to complete
      cy.get('[data-testid="gallery-transition"]', { timeout: 1000 }).should('not.exist');
    });
  });
}); 