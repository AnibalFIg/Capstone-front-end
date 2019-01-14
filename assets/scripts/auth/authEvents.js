const authApi = require('./authApi.js')
const authUi = require('./authUi.js')

const onSignupSubmit = e => {
  e.preventDefault() // prevent page refresh
  const data = getFormData('signup') // argument must be 'signup' or 'signin'
  authApi.signup(data)
    .then(authUi.onSignupSuccess)
    .catch(authUi.onSignupFailure)
}

const onSigninSubmit = e => {
  e.preventDefault() // prevent page refresh
  const data = getFormData('signin') // argument must be 'signup' or 'signin'
  authApi.signin(data)
    .then(authUi.onSigninSuccess)
    .catch(authUi.onSigninFailure)
}

const onLogoutClick = () => {
  authApi.logout()
    .then(console.log)
}

const onChangePassword = e => {
  e.preventDefault()
  const data = { passwords: {} }
  data.passwords.old = $('#old-password').val()
  data.passwords.new = $('#new-password').val()
  console.log(data)
  authApi.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordFailure)
}

const addAuthEventListeners = () => {
  $('#signup-button').on('click', onSignupSubmit)
  $('#signin-button').on('click', onSigninSubmit)
  $('#logout').on('click', onLogoutClick)
  $('#change-password-form').on('submit', onChangePassword)
}

/** Helpers */
const getFormData = type => {
  const data = {credentials: {}}
  data.credentials.email = $(`#${type}-email`).val()
  data.credentials.password = $(`#${type}-password`).val()
  if (type === 'signup') {
    data.credentials.username = $(`#${type}-username`).val()
    data.credentials.password_confirmation = $(`#${type}-password`).val()
  }
  return data
}

module.exports = addAuthEventListeners
