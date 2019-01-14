const api = require('./makeBlogApi.js')

const onMakeSurveySubmit = e => {
  e.preventDefault()
  if (checkEmptyFormFields(e.target)) {
    console.error('Please fill out all fields.')
    return
  }
  const surveyObject = {blog: {
    'title': '',
    'description': '',
    'survey_questions': [ ]
  }}
  // perform some form validations

  // serializeArray will toss all the input values into an array of objects with keys: name & value --
  // name refers to the input name, value refers to value of the input
  // [{name:'question_1', value:'What is your favorite ice cream?'},...]
  // When you get array back, loop through it and add input type to each object
  // **if input type is radio or select, add choices to the object**
  const formData = $(e.target).serializeArray()
  // start a counter for survey questions array
  let i = 0
  console.log(formData)
  formData.forEach(function (e) {
    switch (e.name) {
      case 'title':
        surveyObject.survey.title = e.value
        console.log(surveyObject)
        break
      case 'description':
        surveyObject.survey.description = e.value
        console.log(surveyObject)
        break
      case 'question':
        surveyObject.survey.survey_questions[i] = {}
        surveyObject.survey.survey_questions[i].question = e.value
        console.log(surveyObject)
        break
      case 'input_type':
        surveyObject.survey.survey_questions[i].input_type = e.value
        surveyObject.survey.survey_questions[i].choices = []
        console.log(surveyObject)
        i++
        break
      case 'choice':
        surveyObject.survey.survey_questions[i - 1].choices.push(e.value)
        console.log(surveyObject)
        break
    }
  })
  // if forms are valid, create a survey object
  // send off to api
  api.createSurvey(surveyObject)
    .then(function () {
      onCloseModalClick()
    })
    .catch(console.error)
}

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

/** ** For Configuring Make-A-Survey ****/
/**
 * Adds and removes option inputs when select type is radio or checkbox
 */
const onResponseTypeChange = e => {
  console.log(e.target.value)
  if (e.target.value === 'radio' || e.target.value === 'checkbox') {
    // add response options below question
    $(e.target).closest('.question').find('.options-super').html(`
                    <label for="options" style="margin-left: 49px;">Options: </label>
                    <div class="options" style="display:inline; overflow-x: auto;">
                        <div style="display:inline;">
                            <input placeholder="cheese" type="text" name="choice" style="width: 15%; margin-left: .5%;">
                            <input class="add-choice" type="button" value="+"></input>
                        </div>
                    </div>`)
  } else {
    // remove response options from below question
    $(e.target).closest('.question').find('.options-super').html('')
  }
}

/**
 * Removes the option on '-' click
 */
const onRemoveChoiceClick = e => $(e.target).closest('div').remove()
/**
 * Adds an option on '+' click
 */
const onAddChoiceClick = e => {
  const numOptions = $(e.target).closest('.options').children().length
  let placeholder
  switch (numOptions) {
    case 1:
      placeholder = 'Pepperoni'
      break
    case 2:
      placeholder = 'Anchovies'
      break
    default:
      placeholder = 'Hawaiian'
  }

  if ($(e.target).closest('.options').children().length < 4) {
    $(e.target).closest('.options').append(`<div style="display:inline;">
                                                    <input type="text" placeholder="${placeholder}" name="choice" style="width: 15%; margin-left: .5%;">
                                                    <input class="remove-choice" type="button" value="-"></input>
                                                </div>`)
  }
}

/**
 * Removes a question on '+' click
 */
const onRemoveQuestionClick = e => $(e.target).closest('.question').remove()
/**
 * Adds a question on '+' click
 */
const onAddQuestionClick = () => {
  $('#new-survey').append(`<div class="question">
                                <label for="question">Pose a question: </label>
                                <input type="text" name="question">
                                <label for="input_type" style="margin-left: 25px;">Response-type: </label>
                                <select name="input_type" class="choose-response" style="display: inline">
                                    <optgroup label="desired response-type">
                                        <option value='text'>short response</option>
                                        <option value="textarea">long response</option>
                                        <option value='radio'>choose one</option>
                                        <option value='checkbox'>choose all that apply</option>
                                    </optgroup>
                                </select>
                                <input class="remove-question" type="button" value="-"></input>
                                <div class="options-super"></div>
                            </div>`)
}

/**
 * Resets modal on exit
 */
const onCloseModalClick = () => {
  $('#new-survey').html(`<div style="font-size: 16px;height: 35px;text-align: center;">
                                <label for="title">Survey title: </label>
                                <input id="new-title" type="text" name="title" placeholder="Pizza Topping Survey!" style="height: 27px;">
                            </div>
                            <div style="font-size: 12px;height: 36px;text-align: center;">
                                <label for="title">Description: </label>
                                <input id="new-description" name="description" type="text" placeholder="Let's talk toppings." style="height: 27px; width: 300px; text-align: center">
                            </div>
                            <div class="question">
                                <label for="question">Pose a question: </label>
                                <input name="question" type="text" placeholder="Do you like Hawaiian?">
                                <label for="input-type" style="margin-left: 25px;">Response-type: </label>
                                <select name="input-type" class="choose-response" style="display: inline">
                                    <optgroup label="desired response-type">
                                        <option value='text'>short response</option>
                                        <option value="textarea">long response</option>
                                        <option value='radio'>choose one</option>
                                        <option value='checkbox'>choose all that apply</option>
                                    </optgroup>
                                </select>
                                <input class="add-question" type="button" value="+"></input>
                                <div class="options-super"></div>
                            </div>
                            `)
}

/**
 * Attaches all make-a-survey event listeners
 */
const addMakeASurveyEventListeners = () => {
  // Make-A-Survey event listeners
  $('.modal-body').on('click', '.add-question', onAddQuestionClick)
  $('.modal-body').on('click', '.remove-question', onRemoveQuestionClick)
  $('.modal-body').on('change', '.choose-response', onResponseTypeChange)
  $('.modal-body').on('click', '.add-choice', onAddChoiceClick)
  $('.modal-body').on('click', '.remove-choice', onRemoveChoiceClick)
  $('#new-survey').on('submit', onMakeSurveySubmit)
  $('.modal').on('click', '.close', onCloseModalClick)
}
// $('#myModal').modal('hide')
module.exports = addMakeASurveyEventListeners
