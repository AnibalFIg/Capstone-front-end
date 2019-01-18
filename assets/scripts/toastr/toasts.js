const toastr = require('toastr')

function Toast (type, css, msg) {
  this.type = type
  this.css = css
  this.msg = msg
}

const uiToasts = {
  'signup-pass': new Toast('success', 'toast-top-right', 'Signed-Up Successfully!'),
  'signout-pass': new Toast('success', 'toast-top-right', 'You signed out!'),
  'signin-pass': new Toast('success', 'toast-top-right', 'Signed In Successfully!'),
  'changepass-success': new Toast('success', 'toast-top-right', 'Successfully changed password'),
  'signin-fail': new Toast('warning', 'toast-top-right', 'Failed to Sign-In! Try Again ?'),
  'changepass-fail': new Toast('warning', 'toast-top-right', 'Failed to change password'),
  'signup-fail': new Toast('warning', 'toast-top-right', 'Failed to Sign-Up! Try Again ?'),
  'signout-fail': new Toast('warning', 'toast-top-right', 'You couldnt signed out!')

}

const postToasts = {
  'createpost-pass': new Toast('success', 'toast-top-right', 'Created a post!'),
  'createpost-fail': new Toast('warning', 'toast-top-right', 'Failed to create post!'),

  'allposts-pass': new Toast('info', 'toast-top-right', 'Loading all posts...'),
  'allposts-fail': new Toast('warning', 'toast-top-right', 'Failed to load all posts!'),

  'updatepost-pass': new Toast('info', 'toast-top-right', 'Updating post...'),
  'updatepost-fail': new Toast('warning', 'toast-top-right', 'Failed to update your post!'),

  'deletepost-pass': new Toast('success', 'toast-top-right', 'Removing your post...'),
  'deletepost-fail': new Toast('warning', 'toast-top-right', 'Failed to remove your post!'),

  'allmyposts-pass': new Toast('info', 'toast-top-right', 'Loading all of your posts...'),
  'allmyposts-fail': new Toast('warning', 'toast-top-right', 'Failed to load your posts!'),
  'mylatestpost-success': new Toast('success', 'toast-top-right', 'you did it'),
  'mylatestpost-fail': new Toast('warning', 'toast-top-right', 'Failed to load your latest post')

}

function showToast (action, event) {
  // configure all toastr timeouts
  toastr.options.positionClass = 'toast-top-full-width'
  toastr.options.extendedTimeOut = 0 // 1000;
  toastr.options.timeOut = 1000
  toastr.options.fadeOut = 250
  toastr.options.fadeIn = 250

  // find and display correct Toaster based on event param
  switch (event) {
    case 'ui':
      const uiToast = uiToasts[action]
      toastr.options.positionClass = uiToast.css
      toastr[uiToast.type](uiToast.msg)
      break
    case 'post':
      const postToast = postToasts[action]
      toastr.options.positionClass = postToast.css
      toastr[postToast.type](postToast.msg)
      break
  }
}

module.exports = showToast
