const api = require('./viewABlogApi.js')
const ui = require('./viewABlogUi.js')
const toastr = require('toastr/build/toastr.min')

// create a response to a survey event
const onCreateResponse = function (event) {
  event.preventDefault()
  const blogId = $('#new-response input[type="hidden"]').attr('id')
  const responseObject = {response: {
    'owner': blogId, // owner will be the survey id of the survey the user just submitted
    'responses': []
  }}
  const formData = $(this).serializeArray()
  formData.forEach(function (e, i) {
    responseObject.response.responses[i] = {
      'q_index': i,
      'answer': e.value
    }
  })

  api.createResponse(responseObject)
    .then(console.log) // add ui handlers for creating responses
    .catch(console.error)
}

// get all blogs
const onGetAllBlogs = function (event) {
  event.preventDefault()
  $('#my-blogs').hide()
  $('#every-blog').show()
  $('#blogs-list').html('')
  api.getAllBlogs()
    .then(ui.getBlogsSuccess)
    .catch(ui.getBlogsFailure)
}

const onBlogClick = event => {
  const id = $(event.target).closest('h3').attr('id')
  console.log(id)
  api.getABlog(id)
    .then(ui.getABlogSuccess)
    .catch(console.error)
}

const onSubmitResponse = event => {
  event.preventDefault()
  if (checkEmptyFormFields(event.target)) {
    toastr.error('Please fill out all fields.')
    return
  }
  const blogResponse = []
  $('.q').children().each((_, el) => {
    console.log(el)
    if (!$(el).is('label') && !$(el).is('strong') && !$(el).is('br') && !$(el).is(':checked')) {
      blogResponse.push({ answer: $(el).val() })
    }
  })
  blogResponse.forEach((el, i) => {
    console.log(i)
    el.q_index = i
  })

  const data = {
    response: {
      responses: blogResponse
    }
  }

  console.log(data)

  api.createResponse(data)
    .then(console.log)
    .catch(console.error)
}

// Next steps: fix response,
// allow destruction of mySurveys,
// allow logout-changepw-changeuname
// check if response is being printed in mySelected correctly..

const checkEmptyFormFields = target => {
  let emptyFields = false
  const formData = $(target).serializeArray()
  $.each(formData, (i, field) => {
    if (!field.value) {
      emptyFields = true
    }
  })
  return emptyFields
}

const addTakeABlogEvents = () => {
  $('#new-response').on('submit', onCreateResponse) // not sure wwhat the response submit form will be but feel free to change this to whatever you use.
  $('#get-all-surveys').on('click', onGetAllBlogs)
  $('#surveys-list').on('click', 'a', onBlogClick)
  $('#new-response').on('submit', onSubmitResponse)
}

module.exports = addTakeABlogEvents
