/**
 * @function signIn
 * @description sign in to app
 * @memberof Cypress.Chainable custom cypress command
 * @param {string} username username
 * @param {string} password password
 * @returns {Cypress.Chainable} subject of the command
 */
export function signIn(username, password) {
  const log = Cypress.log({
    message: `signing in as ${username}`,
    consoleProps: () => ({ username, password })
  })
  return cy.request({
    method: 'POST',
    url: '/login',
    body: {
      type: 'LOGIN',
      username: username,
      password: password,
      remember: true
    },
    log: false
  })
    .then(response => {
      const props = log.get('consoleProps')()
      log.set({
        message: `signed in as ${username}`,
        consoleProps: () => ({ ...props, response })
      })
      return response
    })
    .its('body.user', { log: false })
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
      const props = log.get('consoleProps')()
      log.set({
        consoleProps: () => ({ ...props, authState })
      })
    })
}