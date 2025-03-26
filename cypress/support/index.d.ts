/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to simulate tabbing
     * @example cy.tab()
     */
    tab(): Chainable<Element>
    
    /**
     * Custom command to run basic accessibility checks
     * @example cy.checkA11y()
     */
    checkA11y(options?: object): Chainable<Element>
  }
} 