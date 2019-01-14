const store = require('../../store.js')
const apiUrl = require('../../config.js')

const createBlog = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/blogs',
    headers: {
      Authorization: ' Bearer ' + store.user.token
    },
    data: data
  })
}

module.exports = {
  createBlog
}
