// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach('set up routes', () => {
  cy.setupRoutes()
})

beforeEach('sign in', () => {
  const currentSpecName = getCurrentSpecName(Cypress)
  const excludedSpecs = ['sign-in', 'sign-up']
  const isSuiteNotExcluded = !excludedSpecs.includes(currentSpecName)
  if (isSuiteNotExcluded) {
    cy.signIn(Cypress.env('username'), Cypress.env('password'))
  }
})

function getCurrentSpecName(Cypress) {
  const fileName = Cypress.spec.name
  return trimFileExtension(fileName)
}

function trimFileExtension(fileName) {
  return fileName
    .split('.')
    .shift()
}