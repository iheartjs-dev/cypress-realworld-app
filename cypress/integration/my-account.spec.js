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