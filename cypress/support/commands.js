// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { signIn } from './auth'

Cypress.Commands.add('signIn', signIn)
Cypress.Commands.add('setupRoutes', () => {
  cy.server()
  cy.route('POST', '/login')
    .as('login')
  cy.route('GET', '/bankAccounts')
    .as('getBankAccounts')
  cy.route('GET', '/transactions/public')
    .as('getPublicTransactions')
  cy.route('GET', '/notifications')
    .as('getNotifications')
  cy.route('POST', '/logout')
    .as('logout')
  cy.route('PATCH', '/users/*')
    .as('updateUser')
  cy.route('GET', '/checkAuth')
    .as('checkAuth')

})