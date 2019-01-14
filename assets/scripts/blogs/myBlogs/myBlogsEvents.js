const myBlogsApi = require('./myBlogssApi.js')
const myBlogsUi = require('./myBlogsUi.js')

// event handler for getting all of "my" surveys??????
const onGetMyBlogs = function (event) {
  event.preventDefault()
  $('#every-blog').hide()
  $('#my-blogs').show()
  $('#all-blogs-header').text('My Blogs!')
  $('#all-blogs-view').html('')
  myBlogsApi.getMyBlogs()
    .then(myBlogsUi.getMyBlogsSuccess)
    .catch(myBlogsUi.getMyBlogsFailure)
}

const onGetMyBlog = function (event) {
  event.preventDefault()
  const id = $(this).attr('data-id')
  const type = $(this).data('type')
  myBlogsApi.getMyBlog(id)
    .then(myBlogsUi.getMyBlogSuccess)
    .catch(console.error)
}

// delete a blog event

const onDeleteMyBlog = function (event) {
  event.preventDefault()
  const blogId = $(this).attr('data-id')
  console.log(blogId)
  myBlogsApi.deleteMyBlog(blogId)
    .then(myBlogsUi.deleteMyBlogSuccess) // add ui handler
    .catch(console.error)
}

/**
 * Attaches myBlog event listeners
 */
const addMyBlogEventListeners = () => {
  $('#my-blogs').on('click', '.blog-thumbnail', onGetMyBlog)
  $('#get-my-blogs').on('click', onGetMyBlogs)
  // add in event listener for deleting  a blog
  $('#selected-blog').on('click', '#delete-blog', onDeleteMyBlog)
}

module.exports = addMyBlogEventListeners
