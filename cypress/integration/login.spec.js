describe('login', () => {
  it('login with username and password', () => {
    cy.visit('localhost:3000/signin')
    cy.get('#username').type('Allie2')
    cy.get('#password').type('s3cret')
    cy.get('button:contains("Sign In")').click()
  })
})
