describe('My Account', () => {
  const data = {
    username: 'Allie2',
    password: 's3cret'
  }
  beforeEach('sign in', () => {
    signIn(data.username, data.password)
  })
  beforeEach('setup routes', () => {
    setupRoutes()
  })

  beforeEach('nav to My Account', () => {
    cy.visit('/user/settings')
    cy.wait([
      '@getNotifications',
      '@getBankAccounts'
    ])
  })

  it('update account information', () => {
    cy.get('[data-test=user-settings-email-input]')
  })
})

function signIn(username, password) {
  cy.request({
    method: 'POST',
    url: '/login',
    body: {
      type: 'LOGIN',
      username: username,
      password: password,
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
}

function setupRoutes() {
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
  cy.route('PATCH', '/users/*')
    .as('updateUser')
  cy.route('GET', '/checkAuth')
    .as('checkAuth')
}