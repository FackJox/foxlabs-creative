describe('Projects Page', () => {
  beforeEach(() => {
    cy.navigateAndWait('/work');
  });

  it('should display a list of projects', () => {
    cy.get('[data-testid="project-card"]').should('have.length.at.least', 1);
  });

  it('should navigate to project detail page when clicking a project', () => {
    cy.get('[data-testid="project-card"]').first().click();
    cy.url().should('include', '/work/');
    cy.get('[data-testid="project-detail"]').should('exist');
  });

  it('should filter projects by category if filter functionality exists', () => {
    // This test conditionally runs only if the filter functionality exists
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="project-filter"]').length > 0) {
        cy.get('[data-testid="project-filter"]').first().click();
        // After filtering, we should still see at least one project
        cy.get('[data-testid="project-card"]').should('have.length.at.least', 1);
      }
    });
  });

  it('should have working custom cursor on project cards', () => {
    cy.get('[data-testid="project-card"]').first()
      .hoverWithCustomCursor();
    
    // The cursor text should contain a call to action like "VIEW" or "EXPLORE"
    cy.get('[data-cursor-text]').should('exist');
  });
}); 