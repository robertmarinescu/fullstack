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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const blog = {
    likes: body.likes
  }
  try{
    await Blog.findByIdAndUpdate(id, blog, {new: true})
    response.json(blog)
  } catch (exception){
    next(exception)
  }
})

blogsRouter.put('')

module.exports = blogsRouter