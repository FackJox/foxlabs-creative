describe('Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between home and work pages', () => {
    // Check if we're on the home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Go to Work/Projects page
    cy.get('a[href="/work"]').eq(0).click({ force: true });
    cy.url().should('include', '/work');
    
    // Return to home page 
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should navigate using browser history correctly', () => {
    // Setup a navigation history
    cy.get('a[href="/work"]').eq(0).click({ force: true });
    cy.url().should('include', '/work');
    
    // Go back
    cy.go('back');
    cy.url().should('not.include', '/work');
    
    // Go forward
    cy.go('forward');
    cy.url().should('include', '/work');
  });
}); 