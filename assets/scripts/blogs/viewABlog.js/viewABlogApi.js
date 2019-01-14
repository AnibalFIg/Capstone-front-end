const apiUrl = require('../../config.js')
const store = require('../../store.js')

const createResponse = function (data) {
  console.log(data)
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/responses',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    },
    data
  })
}

const getAllBlogs = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/blogs/',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

const getABlog = function (id) {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/blog/' + id,
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

module.exports = {
  createResponse,
  getAllBlogs,
  getABlog
}
