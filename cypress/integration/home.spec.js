describe('home', () => {
  const data = {
    username: 'Allie2',
    password: 's3cret'
  }
  before('setup routes', () => {
    cy.server()
    cy.route('POST', '/login')
      .as('login')
    cy.route('GET', '/bankAccounts')
      .as('getBankAccounts')
    cy.route('GET', '/transactions/public')
      .as('getPublicTransactions')
    cy.route('GET', '/notifications')
      .as('getNotifications')
  })
  before('sign in', () => {
    cy.visit('/signin')
    cy.get('#username')
      .type(data.username)
    cy.get('#password')
      .type(data.password)
    cy.contains('button', 'Sign In')
      .click()
    cy.wait('@login')
    cy.location('pathname')
      .should('equal', '/')
    cy.wait([
      '@getBankAccounts',
      '@getPublicTransactions',
      '@getNotifications'
    ])
  })
  it('log out', () => {
    cy.contains('Logout')
      .click()
  })
})