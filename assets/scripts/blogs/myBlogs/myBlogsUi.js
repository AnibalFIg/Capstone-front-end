
const getMyBlogsSuccess = function (data) {
  let content = ''
  console.log(data)
  data.blogs.forEach(function (e) {
    content += `<div data-id="${e._id}" class="blog-thumbnail">
                  <div class="thumbnail-content">
                    <h2 class="thumbnail-title">${e.title}</h2>
                    <h6 class="thumbnail-description">${e.description}</h6>
                  </div>
                </div>`
  })
  $('.all-my-blogs-view').html(content)
}

const getMyBlogSuccess = function (data) {
  // stores responses (if any)
  const noResponses = data.all_responses[0].responses.length === 0

  // stores questions
  const questions = data.blog.blog_information.map((q, i) => {
    const choice = ''
    if (q.choices.length > 0) {
      q.choices.forEach(choice => {
        return `<span class="selected-blog-choice"> ${choice} </span>`
      })
    }

    const responses = noResponses
      ? `<p class="selected-blog-response">N/a</p>`
      : data.all_responses.map(({ responses }, j) => {
        return `<p class="selected-blog-response">${j + 1}: ${responses[i].answer}</p>`
      })

    return (`
        <div class="question-response-pair" id="${q._id} style="overflow: auto; height: 83%;"">
          <p class="selected-blog-information">${q.information}</p>
          <p class="selected-blog-choices">${choice}</p>
          ${responses}
        </div>
      `)
  })

  const selectedBlog = `<h2 class="selected-blog-title">${data.blog.title}</h2>
            <div class="qr-pairs">
              ${questions}
            </div>
            <p id="delete-blog" data-id="${data.blog._id}">delete</p>`
  $('#selected-blog').html(selectedBlog)
}

module.exports = {
  getMyBlogsSuccess,
  getMyBlogSuccess
}
