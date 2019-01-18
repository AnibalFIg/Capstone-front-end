'use strict'

const showToast = require('../toastr/toasts')

const allPostsTemplate = require('../templates/get-all-post.handlebars')
const allMyPostsTemplate = require('../templates/get-all-my-post.handlebars')
const onePostTemplate = require('../templates/get-one-post-form.handlebars')
const myLatestPostTemplate = require('../templates/get-my-latest-post.handlebars')

const createPostSuccess = function (apiData) {
  console.log(apiData)
  showToast('createpost-pass', 'post')
  // $('#new-post').val('')
  $('#new-post')[0].reset()
}

const createPostFailure = function (apiData) {
  console.log(apiData)
  showToast('createpost-fail', 'post')
}

const getAllPostsSuccess = apiData => {
  console.log(apiData)
  // showToast('allposts-pass', 'post')

  const allThePosts = allPostsTemplate({posts: apiData.posts})
  $('#feed').html(allThePosts)
  return ''
}

const getAllPostsFailure = apiData => {
  console.log(apiData)
  showToast('allposts-fail', 'post')
}

const getLatestPostSuccess = function (apiData) {
  console.log(apiData)
  if (apiData) {
    const latestPost = myLatestPostTemplate({post: apiData.post})
    $('#recent-post-container').html(latestPost)
  }
  // showToast('mylatestpost-success', 'post')
  return ''
}

const getLatestPostFailure = function () {
  // console.log('you failed')
  showToast('mylatestpost-fail', 'post')
}

const updatePostSuccess = apiData => {
  console.log(apiData)
  showToast('updatepost-pass', 'post')

  $('#update-modal').modal('hide')
  return ''
}

const updatePostFailure = apiData => {
  console.log(apiData)
  console.log(`you didn't update a post!`)
  showToast('updatepost-fail', 'post')
}

const deletePostSuccess = function (apiData) {
  console.log(apiData)
  showToast('deletepost-pass', 'post')
}

const deletePostFaliure = function (apiData) {
  console.log(apiData)
  showToast('deletepost-fail', 'post')
}

const getAllMyPostsSuccess = function (apiData) {
  console.log(apiData)
  const allMyPosts = allMyPostsTemplate({posts: apiData.posts})
  $('#feed').html(allMyPosts)
  // showToast('allmyposts-pass', 'post')
}

const getAllMyPostsFailure = function (apiData) {
  console.log(apiData)
  showToast('allmyposts-fail', 'post')
}

const getOnePostSuccess = function (apiData) {
  console.log(apiData)
  const modalContent = onePostTemplate({post: apiData.post})
  $('#update-modal-body').html(modalContent)
}

module.exports = {
  createPostSuccess,
  createPostFailure,
  getAllPostsSuccess,
  getAllPostsFailure,
  updatePostSuccess,
  updatePostFailure,
  deletePostSuccess,
  deletePostFaliure,
  getAllMyPostsSuccess,
  getAllMyPostsFailure,
  getOnePostSuccess,
  getLatestPostSuccess,
  getLatestPostFailure
}
