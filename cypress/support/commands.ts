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
  cy.get('[data-testid="cursor"]').should('exist');
});

// Custom command to set cursor text
Cypress.Commands.add('setCursorText', (text: string) => {
  cy.window().then((win) => {
    win.document.body.setAttribute('data-cursor-text', text);
  });
});

// Custom command to check cursor text
Cypress.Commands.add('checkCursorText', (text: string) => {
  cy.window().then((win) => {
    expect(win.document.body.getAttribute('data-cursor-text')).to.equal(text);
  });
});

// Custom command to hover over element and check cursor text
Cypress.Commands.add('hoverAndCheckCursor', { prevSubject: 'element' }, (subject, text: string) => {
  cy.wrap(subject).trigger('mouseenter');
  cy.checkCursorText(text);
  cy.wrap(subject).trigger('mouseleave');
  cy.window().then((win) => {
    expect(win.document.body.hasAttribute('data-cursor-text')).to.be.false;
  });
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

// Extend Cypress interface
declare global {
  namespace Cypress {
    interface Chainable {
      checkCustomCursor(): Chainable<void>
      setCursorText(text: string): Chainable<void>
      checkCursorText(text: string): Chainable<void>
      hoverAndCheckCursor(text: string): Chainable<void>
      navigateAndWait(path: string): Chainable<void>
      checkNavigationMenu(): Chainable<void>
    }
  }
}