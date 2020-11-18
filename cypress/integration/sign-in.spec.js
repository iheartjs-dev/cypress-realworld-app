describe('sign in', () => {
  const data = {
    username: Cypress.env('username'),
    password: Cypress.env('password')
  }
  it('sign in with username and password', () => {
    cy.visit('/signin')
    cy.get('#username')
      .type(data.username)
    cy.contains('button', 'Sign In')
      .should('be.disabled')
      .and('have.class', 'Mui-disabled')
    cy.get('#password')
      .type(data.password)
    cy.get('[data-test="signin-remember-me"]')
      .should('not.have.class', 'Mui-checked')
    cy.get('[data-test="signin-remember-me"] input')
      .should('not.be.checked')
      .check()
    cy.get('[data-test="signin-remember-me"]')
      .should('have.class', 'Mui-checked')
    cy.contains('a', 'Don\'t have an account? Sign Up')
      .should('have.attr', 'href', '/signup')
    cy.contains('button', 'Sign In')
      .should('not.be.disabled')
      .and('not.have.class', 'Mui-disabled')
      .click()
    cy.wait('@login')
      .its('request.body')
      .should('deep.equal', {
        username: data.username,
        password: data.password,
        remember: true,
        type: 'LOGIN'
      })
    cy.location('pathname')
      .should('equal', '/')
    cy.wait([
      '@getBankAccounts',
      '@getPublicTransactions',
      '@getNotifications'
    ])
  })
})