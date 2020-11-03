describe('home', () => {
  const data = {
    username: 'Allie2',
    password: 's3cret',
    fullName: 'Kaylin H'
  }
  beforeEach('setup routes', () => {
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
  })
  beforeEach('sign in', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        type: 'LOGIN',
        username: data.username,
        password: data.password,
        remember: true
      },
    })
      .its('body.user')
      .then(user => {
        const authState = {
          value: 'authorized',
          context: { user },
          _event: {},
          event: {
            data: { user }
          }
        }
        window.localStorage.setItem('authState', JSON.stringify(authState))
      })
    cy.visit('/')
  })

  describe('side nav', () => {
    it('name, handle and avatar are visible', () => {
      cy.get('[data-test=sidenav-user-full-name]')
        .should('be.visible')
        .and('have.text', data.fullName)
      cy.get('[data-test=sidenav-username]')
        .should('be.visible')
        .and('contain.text', data.username)
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