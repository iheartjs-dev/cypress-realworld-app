describe('sign in', () => {
  it('sign in with username and password', () => {
    cy.visit('/signin')
    cy.get('#username').type('Allie2')
    cy.get('button:contains("Sign In")').should('be.disabled').and('have.class', 'Mui-disabled')
    cy.get('#password').type('s3cret')
    cy.get('button:contains("Sign In")').click()
  })
})
