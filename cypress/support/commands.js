require('cypress-iframe')

Cypress.Commands.add('login', (
  email=Cypress.env('USER_EMAIL'),
  password=Cypress.env('USER_PASSWORD'),
  { cacheSession = true } = {}
) => {
  const login = () => {
    cy.visit('/login')
    cy.contains('button[type=submit]', 'Login').should('have.attr', 'disabled')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.contains('button[type=submit]', 'Login')
      .click()
    cy.get('div.Home h1', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', 'Your Notes')
  }

  if (cacheSession) {
    cy.session([email, password], login)
  } else {
    login()
  }
})

const attachFileHandler = fileName => {
  cy.get('#file').selectFile(`cypress/fixtures/${fileName}`)
    .then($inputFile => {
      expect($inputFile[0].files[0].name).to.be.equal(fileName)
    })
}

Cypress.Commands.add('createNote', (note, fileName) => {
  cy.visit('/notes/new')
  cy.get('#content').type(note)
  if (fileName) attachFileHandler(fileName)
  cy.get('button[type=submit]').click()
  cy.contains('a h4[class*=item]', note)
    .should('be.visible')
})

Cypress.Commands.add('updateNote', (note, updatedNote, fileName) => {
  cy.contains('a h4[class*=item]', note)
    .click()

  cy.get('#content').clear().type(updatedNote)
  if (fileName) attachFileHandler(fileName)
  cy.get('button[type=submit]').click()
  cy.contains('a h4[class*=item]', updatedNote, { timeout: 8000 })
    .should('be.visible')
})

Cypress.Commands.add('deleteNote', note => {
  cy.contains('a h4[class*=item]', note)
    .click()
  cy.contains('button', 'Delete').click()
  cy.get('div.list-group')
    .should('be.visible')
    .and('not.include.text', note)
})

Cypress.Commands.add('fillSettingsFormAndSubmit', (storage, name, creditCard) => {
  const { number, cvc, date, postal } = creditCard
  cy.visit('/settings')
  cy.get('#storage').type(storage)
  cy.get('#name').type(name)
  cy.iframe('div.card-field iframe')
    .as('iframe')
    .find('[name=cardnumber]')
    .type(number)

  cy.get('@iframe')
    .find('[name=exp-date]')
    .type(date)

  cy.get('@iframe')
    .find('[name=cvc]')
    .type(cvc)

  cy.get('@iframe')
    .find('[name=postal]')
    .type(postal)

  cy.contains('button[type=submit]', 'Purchase').click()
})