describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.get('h1').should('exist');
    cy.checkCustomCursor();
  });

  it('should allow navigation to projects page', () => {
    cy.contains('a', /work|projects/i).click();
    cy.url().should('include', '/work');
    cy.get('h1').should('contain', /work|projects/i);
  });

  it('should allow navigation to services page', () => {
    cy.contains('a', /services/i).click();
    cy.url().should('include', '/services');
    cy.get('h1').should('contain', /services/i);
  });

  it('should update cursor text when hovering navigation items', () => {
    cy.contains('a', /work|projects/i)
      .trigger('mouseenter');
    
    cy.get('[data-cursor-text]').should('exist');
    
    cy.contains('a', /work|projects/i)
      .trigger('mouseleave');
      
    cy.get('[data-cursor-text]').should('not.be.visible');
  });
}); 