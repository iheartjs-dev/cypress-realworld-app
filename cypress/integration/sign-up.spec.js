describe('sign up', () => {
  const data = {
    firstName: 'Mike',
    lastName: 'C',
    username: Date.now(),
    password: 'password',
    baseUrl: Cypress.config('baseUrl'),
    bankName: 'Farrs Wellgo',
    routingNumber: '123456789',
    accountNumber: '123456789'
  }
  it('sign up, login as new user, complete wizard', () => {
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
    cy.wait('@createUser')
    cy.get('#username')
      .type(data.username)
    cy.get('#password')
      .type(data.password)
    cy.contains('button', 'Sign In')
      .click()
    cy.wait('@login')
    cy.location('pathname')
      .should('equal', '/')
    cy.wait('@getBankAccounts')
    cy.wait('@getPublicTransactions')
    cy.wait('@getNotifications')
    cy.contains('[role=dialog]', 'Get Started with Real World App')
      .should('be.visible')
    cy.contains('button', 'Next')
      .click()
    cy.get('#bankaccount-bankName-input')
      .type(data.bankName)
    cy.get('#bankaccount-routingNumber-input')
      .type(data.routingNumber)
    cy.get('#bankaccount-accountNumber-input')
      .type(data.accountNumber)
    cy.contains('button', 'Save')
      .click()
    cy.wait([
      '@createBankAccount',
      '@getBankAccounts'
    ])
    cy.contains('button', 'Done')
      .click()
    cy.get('[role=dialog]')
      .should('not.exist')
  })
})