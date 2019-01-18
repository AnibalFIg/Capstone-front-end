'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events')
const postEvents = require('./post/post-event')

$(() => {
  // your JS code goes here
  authEvents.addEvents()
  postEvents.addPostEventListeners()
})
