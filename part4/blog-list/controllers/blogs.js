const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if(blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
  
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
  
    try{
      await blog.save()
      response.status(201).json(blog)
    } catch (exception){
      next(exception)
    }
  })

module.exports = blogsRouter