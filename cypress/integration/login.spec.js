describe('sign in', () => {
  it('sign in with username and password', () => {
    cy.visit('/signin')
    cy.get('#username')
      .type('Allie2')
    cy.get('#password')
      .type('s3cret')
    cy.get('[data-test="signin-remember-me"] input')
      .check()
    cy.contains('button', 'Sign In')
      .click()
  })
})
