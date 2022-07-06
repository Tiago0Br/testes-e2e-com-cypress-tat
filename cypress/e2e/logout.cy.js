describe('Logout', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Logout from application', () => {
    cy.visit('/')
    if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }

    cy.contains('nav a', 'Logout').click()
    cy.contains('button', 'Login')
      .should('be.visible')
      .and('have.attr', 'disabled')
  })
})