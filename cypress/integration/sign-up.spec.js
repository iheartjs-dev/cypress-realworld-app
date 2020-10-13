describe('sign up', () => {
  const data = {
    firstName: 'Mike',
    lastName: 'C',
    username: Date.now(),
    password: 'password',
    baseUrl: Cypress.config('baseUrl')
  }
  it('sign up, login as new user, see dialog', () => {
    cy.server()
    cy.route('POST', '/users')
      .as('createUser')
    cy.route('POST', '/login')
      .as('login')
    cy.route('GET', '/bankAccounts')
      .as('getBankAccounts')
    cy.route('GET', '/transactions/public')
      .as('getPublicTransactions')
    cy.route('GET', '/notifications')
      .as('getNotifications')

    cy.visit('signup')
    cy.get('#firstName')
      .type(data.firstName)
    cy.get('#lastName')
      .type(data.lastName)
    cy.get('#username')
      .type(data.username)
    cy.get('#password')
      .type(data.password)
    cy.get('#confirmPassword')
      .type(data.password)
    cy.contains('button', 'Sign Up')
      .click()
    cy.get('#username')
      .type(data.username)
    cy.get('#password')
      .type(data.password)
    cy.contains('button', 'Sign In')
      .click()
    cy.url()
      .should('equal', data.baseUrl + '/')
    cy.contains('[role=dialog]', 'Get Started with Real World App')
      .should('be.visible')
  })
})