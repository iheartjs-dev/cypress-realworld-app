export function signIn(username, password) {
  const log = Cypress.log({
    consoleProps() {
      return {
        username,
        password
      }
    }
  })
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
    .then(response => {
      log.set({
        consoleProps() {
          return {
            username,
            password,
            response
          }
        }
      })
      return response
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