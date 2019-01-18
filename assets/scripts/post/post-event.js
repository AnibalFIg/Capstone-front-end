'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./post-api.js')
const ui = require('./post-ui.js')

const addPostEventListeners = function () {
  // temp event listeners
  // $('#get-all-posts').on('submit', onGetAllPosts)
  // $('#get-all-my-posts').on('submit', onGetAllMyPosts)
  // most event listeners will need to be chained onto the return of
  // posts from the Api (aka, on sign in/get all posts)
  $('#change-view :checkbox').change(changeFeedView)
  $('#new-post').on('submit', onCreatePost)
}

const addPostHandlers = function () {
  $('.update-post').on('click', showUpdate)
  $('.delete-post').on('click', onDeletePost)
  return ''
}

let currentFeedView = false
//
const changeFeedView = () => {
  // feed contains all users posts after sign-in
  $('#create-post-container').toggle()
  $('#recent-post-container').toggle()
  // if my posts arent in the view
  if (!currentFeedView) {
    // add my posts to the feed
    currentFeedView = true
    onGetAllMyPosts()
    // onGetLatestPost()
    // show (toggle) #create-post-form
  } else {
    // add all posts to the feed
    onGetAllPosts()
    currentFeedView = false
    // get my last post
    // remove #create-post-form
  }
}

const addPostUpdateButton = function () {
  $('#update-text').on('submit', onUpdatePost)
}

const showUpdate = function (event) {
  event.preventDefault()
  const postId = $(event.target).closest('section').data('id')
  $('#update-modal').modal('show')
  api.getOnePost(postId)
    .then(ui.getOnePostSuccess)
    .then(addPostUpdateButton)
    .catch()
}

const onCreatePost = function (event) {
  event.preventDefault()
  console.log(event)

  const data = getFormFields(event.target)
  console.log(data)

  api.createPost(data)
    .then(ui.createPostSuccess)
    .then(onGetAllMyPosts)
    .catch(ui.createPostFailure)
}

const onGetLatestPost = function () {
  console.log('complete1')
  if (event) { // checks if event is truthy before running prevent default
    event.preventDefault()
  }
  api.getLatestPost()
    .then(ui.getLatestPostSuccess)
    .catch(ui.getLatestPostFailure)
}

const onGetAllPosts = event => {
  // event will only be truthy when onGetAllPosts is triggered by a button click
  if (event) { // checks if event is truthy before running prevent default
    event.preventDefault()
  }
  console.log('complete2')

  api.getAllPosts()
    .then(ui.getAllPostsSuccess)
    .then(addPostHandlers)
    .catch(ui.getAllPostsFailure)

  onGetLatestPost()
  return ''
}

const onUpdatePost = event => {
  event.preventDefault()
  console.log(event)

  // how do we want to display changes to the post?
  const formData = getFormFields(event.target)
  console.log(formData)

  const postId = $(event.target).closest('section').data('id')

  api.updatePost(formData, postId)
    .then(ui.updatePostSuccess)
    .then(onGetAllMyPosts)
    .catch(ui.updatePostFailure)

  onGetLatestPost()
}

const onDeletePost = function () {
  event.preventDefault()
  const postId = $(event.target).closest('section').data('id')
  api.deletePost(postId)
    .then(ui.deletePostSuccess)
    .then(onGetAllMyPosts)
    .catch(ui.deletePostFaliure)

  onGetLatestPost()
}

const onGetAllMyPosts = function () {
  api.getAllMyPosts()
    .then(ui.getAllMyPostsSuccess)
    .then(addPostHandlers)
    .catch(ui.getAllMyPostsFailure)
}

module.exports = {
  addPostEventListeners,
  onGetAllPosts,
  onGetAllMyPosts,
  changeFeedView
}
