describe('My Account', () => {
  const data = {
    username: 'Allie2',
    password: 's3cret'
  }
  beforeEach('sign in', () => {
    signIn(data.username, data.password)
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
})