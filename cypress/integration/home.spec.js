describe('home', () => {
  beforeEach('nav to Home', () => {
    cy.visit('/')
  })

  describe('side nav', () => {
    it('name, handle and avatar are visible', () => {
      cy.get('@user')
        .then(user => {
          const data = {
            username: Cypress.env('username'),
            fullName: getFullName(user.firstName, user.lastName)
          }
          cy.get('[data-test=sidenav-user-full-name]')
            .should('be.visible')
            .and('have.text', data.fullName)
          cy.get('[data-test=sidenav-username]')
            .should('be.visible')
            .and('contain.text', data.username)
        })
    })
    it('balance amount and its subtitle are visible', () => {
      cy.get('[data-test=sidenav-user-balance]')
        .should('be.visible')
      cy.contains('h6', 'Account Balance')
        .should('be.visible')
    })
    it('side nav links are visible and correct', () => {
      cy.contains('a', 'Home')
        .should('have.attr', 'href', '/')
      cy.contains('a', 'My Account')
        .should('have.attr', 'href', '/user/settings')
      cy.contains('a', 'Bank Accounts')
        .should('have.attr', 'href', '/bankaccounts')
      cy.contains('a', 'Notifications')
        .should('have.attr', 'href', '/notifications')
    })
    it('log out', () => {
      cy.contains('Logout')
        .click()
      cy.wait('@logout')
      cy.location('pathname')
        .should('equal', '/signin')
    })
  })
  describe('toolbar and tabs', () => {
    it('toggle side nav closed and back open')
    it('Real World App title links to Home')
    it('new transaction and notification bell are visible')
    it('all tabs are visible, links are correct')
  })
})

function getFullName(firstName, lastName) {
  return `${firstName} ${lastName.charAt(0)}`
}