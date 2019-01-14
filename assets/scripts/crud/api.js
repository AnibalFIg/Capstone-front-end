const store = require('../store.js')
const apiUrl = require('../config.js')

const getAllBlogsApi = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/blogs/'
  })
}

const getBlogApi = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/blogs/' + store.id,
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

const createBlogApi = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/blogs',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    },
    data: data
  })
}

const createResponseApi = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/responses',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    },
    data: data
  })
}

const deleteBlogApi = function (id) {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl + '/blog/' + id,
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

module.exports = {
  getAllBlogsApi,
  getBlogApi,
  createBlogApi,
  createResponseApi,
  deleteBlogApi
}
