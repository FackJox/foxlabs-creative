describe('Cursor Visibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show cursor trail and dots at all times', () => {
    // Cursor trail should be visible
    cy.get('[data-testid="cursor-trail"]').should('be.visible');
    
    // Cursor dots should be visible
    cy.get('[data-testid="cursor-dot"]').should('have.length', 5).each(($dot) => {
      cy.wrap($dot).should('be.visible');
    });
  });

  it('should show main cursor only when hovering interactive elements', () => {
    // Initially cursor should not be visible (opacity-0)
    cy.get('[data-testid="cursor"]').should('exist');
    
    // Hover over a button or link (assuming there's a navigation link)
    cy.get('a').first().trigger('mouseenter');
    
    // Main cursor should now be visible (opacity-100)
    cy.get('[data-testid="cursor"]').should('have.class', 'opacity-100');
    
    // Move away from the link
    cy.get('body').trigger('mousemove', { clientX: 100, clientY: 100 });
    
    // Main cursor should be invisible again
    cy.get('[data-testid="cursor"]').should('not.have.class', 'opacity-100');
  });
}); 