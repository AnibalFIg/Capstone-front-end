const getBlogsSuccess = function (data) {
  let content = ''
  data.blogs.forEach(function (e) {
    content += `<li class="blog-list-item">
                    <h3 id="${e._id}" class="blog-title" data-type="take-blog">
                      <a href="#take-a-blog" data-toggle="modal" data-target="#take-a-blog-modal">
                        ${e.title}
                      </a>
                    </h3>
                    <p>${e.description}</p>
                </li>`
  })
  $('#blogs-list').html(content)
}

const getABlogSuccess = function (response) {
  const blog = response.blog

  $('#take-blog-title').text(blog.title)
  let input = ''
  input += `<input id=${blog._id} type="hidden"/>`
  console.log(blog)
  blog.blog_imformation.forEach((info, idx) => {
    input += `<div class="q"><label for=${idx}><strong>${info.information}</strong></label><br>`
    switch (info.input_type) {
      case 'text':
        input += `<input id=${idx} type="text" name="text-${idx}" placeholder="Answer with care" />`
        break
      case 'textarea':
        input += `<textarea placeholder="Insert thoughtful response.." name="textarea-${idx}" rows="5" cols="84" />`
        break
      case 'radio':
        input += info.choices.reduce((total, choice) => {
          return total + `<input type="radio" value="${choice}" name="${idx}"> ${choice}<br>`
        }, '')
        break
      case 'checkbox':
        input += info.choices.reduce((total, choice, i) => {
          return total + `<input type="checkbox" value="${choice}" name="${idx}-${i}"> ${choice}<br>`
        }, '')
        break
    }
    input += '</div><br>'
  })
  $('#new-response').html(input)
  $('.modal').modal('hide')
}

module.exports = {
  getBlogsSuccess,
  getABlogSuccess
}
