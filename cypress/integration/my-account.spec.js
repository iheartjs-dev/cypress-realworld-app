describe('My Account', () => {
  const data = {
    email: 'kaylin.homenick@gmail.com'
  }

  beforeEach('nav to My Account', () => {
    cy.visit('/user/settings')
    cy.wait([
      '@getNotifications',
      '@getBankAccounts'
    ])
  })

  it('update account information', () => {
    cy.get('[data-test=user-settings-email-input]')
      .clear()
      .type(data.email)
    cy.get('[data-test=user-settings-submit]')
      .click()
    cy.wait('@updateUser')
      .its('request.body.email')
      .should('equal', data.email)
    cy.wait('@checkAuth')
  })
})