/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// Custom command to check if custom cursor is visible
Cypress.Commands.add('checkCustomCursor', () => {
  cy.get('[data-cursor]').should('exist');
});

// Custom command to interact with elements that have custom cursor behavior
Cypress.Commands.add('hoverWithCustomCursor', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).trigger('mouseenter');
  // Check if cursor text has been updated
  cy.get('[data-cursor-text]').should('exist');
  return cy.wrap(subject);
});

// Custom command to navigate and wait for page load
Cypress.Commands.add('navigateAndWait', (path: string) => {
  cy.visit(path);
  // Wait for page to be fully loaded
  cy.get('body').should('be.visible');
  cy.get('[data-loading-state="false"]').should('exist', { timeout: 10000 });
});

// Custom command to check navigation menu consistency
Cypress.Commands.add('checkNavigationMenu', () => {
  // Verify all main navigation items exist
  cy.get('nav').within(() => {
    cy.contains('a', /work|projects/i).should('exist');
    cy.contains('a', /services/i).should('exist');
    cy.contains('a', /team|about/i).should('exist');
    cy.contains('a', /contact/i).should('exist');
  });
  
  // Verify logo exists
  cy.get('[data-test="logo"]').should('exist');
  
  // Check cursor functionality on nav items
  cy.contains('a', /work|projects/i).trigger('mouseenter');
  cy.get('[data-cursor-text]').should('exist');
  cy.contains('a', /work|projects/i).trigger('mouseleave');
});

declare global {
  namespace Cypress {
    interface Chainable {
      checkCustomCursor(): Chainable<void>;
      hoverWithCustomCursor(): Chainable<Element>;
      navigateAndWait(path: string): Chainable<void>;
      checkNavigationMenu(): Chainable<void>;
    }
  }
}