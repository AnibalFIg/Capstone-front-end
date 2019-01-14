const apiUrl = require('../../config.js')
const store = require('../../store.js')

const getMyBlog = function (id) {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/blogs/' + id,
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

const getMyBlogs = function () {
  return $.ajax({
    method: 'GET',
    url: apiUrl + '/myblogs/',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

const deleteMyBlog = function (id) {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl + '/blog/' + id,
    headers: {
      Authorization: ' Bearer ' + store.user.token
    }
  })
}

module.exports = {
  getMyBlogs,
  deleteMyBlog,
  getMyBlog
}
