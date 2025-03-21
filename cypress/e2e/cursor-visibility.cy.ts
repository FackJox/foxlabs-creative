describe('Cursor Visibility', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for any animations or rendering to complete
    cy.wait(1000);
  });

  it('should have both main cursor and cursor small elements', () => {
    // Main cursor should exist
    cy.get('[data-testid="cursor"]').should('exist');
    
    // Cursor small should exist
    cy.get('[data-testid="cursor-small"]').should('exist');
  });
  
  it('should have the correct data attributes', () => {
    // Main cursor should have inactive state initially
    cy.get('[data-testid="cursor"]').should('have.attr', 'data-state', 'inactive');
    
    // Cursor small should have the correct data attribute
    cy.get('[data-testid="cursor-small"]').should('have.attr', 'data-cursor-small');
  });
}); 