'use strict'

const addAuthEventListeners = require('./auth/authEvents.js')
const addMakeABlogEventListeners = require('./blogs/makeABlog/makeABlogEvents.js')
const addViewABlogEventListeners = require('./blogs/viewABlog/ViewABlogEvents.js')
const addMyBlogsEventListeners = require('./blogss/myBlogs/myBlogsEvents.js')

const addBlogEventListeners = () => {
  addMakeABlogEventListeners()
  addViewABlogEventListeners()
  addMyBlogsEventListeners()
}

$(() => {
  addAuthEventListeners()
  addBlogEventListeners()
})
