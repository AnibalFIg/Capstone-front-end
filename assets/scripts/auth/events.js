const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const posts = require('../post/post-event.js')

const addEvents = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  // auth-modal event
  $('#show-auth-modal').on('click', () => {
    // event.preventDefault()
    console.log('hi')
    $('#user-modal').modal('show')
  })
  $('#launch-change-password').on('click', () => {
    $('#change-password-form').toggle()
    // clear form response
    $('#changePassResponse').text('')
  })
  $('#change-password-form').on('submit', onChangePass)

  $('#sign-out').on('click', onSignOut)
}

const onSignUp = function (event) {
  event.preventDefault()

  // get form data
  const data = getFormFields(event.target)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  // get form data
  const data = getFormFields(event.target)
  console.log(data)

  api.signIn(data)
    .then(ui.signInSuccess)
    .then(posts.onGetAllPosts)
  // .then(posts.onGetLatestPost)
    .catch(ui.signInFailure)
}

const onChangePass = (event) => {
  event.preventDefault()

  // get form data
  const data = getFormFields(event.target)
  console.log(data)

  api.changePass(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFailure)
}

const onSignOut = function () {
  // event.preventDefault()

  // get form data
  const data = getFormFields(event.target)
  console.log(data)

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

module.exports = {
  addEvents,
  onSignUp,
  onSignIn,
  onChangePass,
  onSignOut

}
