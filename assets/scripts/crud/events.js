const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

// get all blogs event
const onGetAllBlogs = function (event) {
  event.preventDefault()
  api.getAllBlogsApi()
    .then(function (response) {
      console.log(response.blogs)
    })
    .catch(console.error)
}

// get all user blogs -- blogs that the user created

// get one blog event

const onGetBlog = function (event) {
  event.preventDefault()
  api.getBlogApi()
    .then(function (response) {
      console.log(response)
    })
    .catch(console.error)
}

// create a blog event

const onCreateBlog = function (event) {
  event.preventDefault()
  const blogObject = { blog: {
    'title': '',
    'description': '',
    'blog_content': []
  }}
  // perform some form validations

  // serializeArray will toss all the input values into an array of objects with keys: name & value --
  // name refers to the input name, value refers to value of the input
  // [{name:'question_1', value:'What is your favorite ice cream?'},...]
  // When you get array back, loop through it and add input type to each object
  // **if input type is radio or select, add choices to the object**
  const formData = $(this).serializeArray()
  console.log(formData)
  // start a counter for blog questions array
  let i = 0
  formData.forEach(function (e) {
    switch (e.name) {
      case 'title':
        blogObject.blog.title = e.value
        break
      case 'description':
        blogObject.blog.description = e.value
        break
      case 'content':
        blogObject.blog.blog_content[i] = {}
        blogObject.blog.blog_content[i].question = e.value
        break
      case 'input_type':
        blogObject.blog_content[i].input_type = e.value
        blogObject.blog.blog_content[i].choices = []
        i++
        break
      case 'choice':
        blogObject.blog.blog_content[ i - 1 ].choices.push(e.value)
        break
    }
  })
  // if forms are valid, create a blog object
  // send off to api
  api.createBlogApi(blogObject)
    .then(console.log)
    .catch(console.error)
}

// create a response to a blog event
const onCreateResponse = function (event) {
  event.preventDefault()
  blogId = $(this).data('id')
  const responseObject = {response: {
    'owner': blogId, // owner will be the blog id of the blog the user just submitted
    'responses': []
  }}
  const formData = $(this).serializeArray()
  const i = 0
  formData.forEach(function (e, i) {
    responseObject.response.responses[i] = {
      'q_index': i,
      'answer': e.value
    }
  })
  api.createResponseApi(responseObject)
    .then(console.log)
    .catch(console.error)
}

// delete a blog event
const onDeleteBlog = function (event) {
  event.preventDefault()
  const blogId = $(this).data('id')

  api.deleteBlogApi(blogId)
    .then(console.log)
    .catch(console.log)
}

const addCrudEventListeners = function () {
// click handlers
  $('#get-blogs').on('click', onGetAllBlogs)
  $('.blog-thumbnail').on('click', onGetBlog)
  $('#create-blog').on('click', onCreateBlog)
  $('.delete-blog').on('click', onDeleteBlog)

  // Submit handlers
  $('#create-blog-form').on('submit', onCreateBlog)
  $('#create-response-form').on('submit', onCreateResponse)
}

module.exports = {
  addCrudEventListeners,
  store,
  ui
}
