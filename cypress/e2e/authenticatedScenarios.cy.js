/// <reference types="cypress" />
const faker = require('faker')

describe('CRUD notes and fill Settings form', () => {
  beforeEach(() => {
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'), { cacheSession: false })
  })

  it('Cread, read, update and delete a note', () => {
    const note = faker.lorem.words(4)
    cy.createNote(note)

    const updatedNote = faker.lorem.words(4)
    cy.updateNote(note, updatedNote, 'example.json')

    cy.deleteNote(updatedNote)
  })

  it('Fill settings form and submit', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')
    cy.fillSettingsFormAndSubmit(5, 'Joãozinho', Cypress.env('CREDIT_CARD'))
    cy.wait('@paymentRequest').then(({ state, response }) => {
      expect(state).to.be.equal('Complete')
      expect(response.statusCode).to.be.equal(200)
    })
  })

  it('Logout from application', {  tags: '@desktop-and-tablet' } , () => {
    cy.visit('/')

    cy.contains('nav a', 'Logout').click()
    cy.contains('button', 'Login')
      .should('be.visible')
      .and('have.attr', 'disabled')
  })
})