/// <reference path='../support/commands.d.ts' />
describe('Login', () => {
  it('Login with valid credentials', () => {
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'), { cacheSession: false })
  })
})