const store = require('../store.js')
const apiUrl = require('../config.js')

const signup = data => {
  return $.ajax({
    url: `${apiUrl}/sign-up`,
    method: 'POST',
    data
  })
}

const signin = data => {
  return $.ajax({
    url: `${apiUrl}/sign-in`,
    method: 'POST',
    data
  })
}

const changePassword = data => {
  console.log(store.user.token)
  return $.ajax({
    url: `${apiUrl}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    },
    data
  })
}

module.exports = {
  signup,
  signin,
  changePassword
}
