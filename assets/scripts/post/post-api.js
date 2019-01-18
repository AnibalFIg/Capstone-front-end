'use strict'

const config = require('../config.js')
const userStore = require('../store.js')

const createPost = function (data) {
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + '/posts',
    method: 'POST',
    headers: {Authorization: `Token token=${userToken}`},
    data: data
  })
}

const getAllPosts = () => {
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + '/posts',
    method: 'GET',
    headers: {Authorization: `Token token=${userToken}`}
  })
}

const getLatestPost = () => {
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + '/posts/myLatestPost',
    method: 'GET',
    headers: {Authorization: `Token token=${userToken}`}
  })
}

const updatePost = (formData, postId) => {
  console.log(formData)
  console.log(postId)
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + `/posts/${postId}`,
    method: 'PATCH',
    headers: {Authorization: `Token token=${userToken}`},
    data: formData
  })
}

const deletePost = function (postId) {
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + `/posts/${postId}`,
    method: 'DELETE',
    headers: {Authorization: `Token token=${userToken}`}
  })
}

const getAllMyPosts = () => {
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + '/posts/myPosts',
    method: 'GET',
    headers: {Authorization: `Token token=${userToken}`}
  })
}

const getOnePost = (postId) => {
  const userToken = userStore.user.token
  return $.ajax({
    url: config.apiUrl + `/posts/${postId}`,
    method: 'GET',
    headers: {Authorization: `Token token=${userToken}`}
  })
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getAllMyPosts,
  getOnePost,
  getLatestPost
}
