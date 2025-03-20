describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.get('h1').should('exist');
  });

  it('should allow navigation to projects/work page', () => {
    cy.get('a[href="/work"]').eq(0).click({ force: true });
    cy.url().should('include', '/work');
  });

  it('should allow navigation to about page', () => {
    cy.get('a[href="/about"]').eq(0).click({ force: true });
    cy.url().should('include', '/about');
  });

  it('should navigate back to homepage from work page', () => {
    cy.get('a[href="/work"]').eq(0).click({ force: true });
    cy.url().should('include', '/work');
    
    cy.go('back');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should support basic browser navigation', () => {
    cy.visit('/');
    
    cy.get('a[href="/work"]').eq(0).click({ force: true });
    cy.url().should('include', '/work');
    
    cy.go('back');
    cy.url().should('not.include', '/work');
    
    cy.go('forward');
    cy.url().should('include', '/work');
  });
}); 