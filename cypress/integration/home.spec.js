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
    cy.route('POST', '/logout')
      .as('logout')
  })
  before('sign in', () => {
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
  it('log out', () => {
    cy.contains('Logout')
      .click()
    cy.wait('@logout')
    cy.location('pathname')
      .should('equal', '/signin')
  })
})