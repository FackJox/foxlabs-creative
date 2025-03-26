// Custom command to simulate tabbing
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  const tabKey = { keyCode: 9, which: 9 };
  
  if (subject) {
    return cy.wrap(subject).trigger('keydown', tabKey);
  }
  
  return cy.focused().trigger('keydown', tabKey);
});

// Custom command to check a11y
Cypress.Commands.add('checkA11y', (options = {}) => {
  // This is a simplified version since we don't have cypress-axe
  cy.log('Running basic accessibility checks');
  
  // Check for alt text on images
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
  
  // Check for proper aria attributes on interactive elements
  cy.get('button, a[href], [role="button"]').each(($el) => {
    if (!$el.text().trim() && !$el.attr('aria-label')) {
      cy.wrap($el).should('have.attr', 'aria-label');
    }
  });
});

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { /* ... */ });

// -- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { /* ... */ });

// -- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { /* ... */ });

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { /* ... */ }); 