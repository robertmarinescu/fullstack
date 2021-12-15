const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initial_blogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return the correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initial_blogs.length)
})

test('check that id property exists', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('add a valid blog into the database', async () => {
  const newBlog = {
    title: "Gates Notes",
    author: "Bill Gates",
    url: "http://www.gatesnotes.com",
    likes: 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initial_blogs.length + 1)

  const title = blogs[2].title
  expect(title).toEqual('Gates Notes')
})

test('if like property is missing check that it\'s value is equal to 0', async () => {
  const newBlog = {
    title: "Future of Humanity",
    author: "Elon Musk",
    url: "http://www.futureofhumanity.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(helper.initial_blogs.length + 1)
  expect(blogs[helper.initial_blogs.length].likes).toBe(0);
})

test('check if the TITLE is missing in the added blog', async () => {
  const newBlog = {
    author: "Elon Musk",
    url: "http://www.futureofhumanity.com",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('check if the URL is missing in the added blog', async () => {
  const newBlog = {
    author: "Elon Musk",
    title: "Future of Humanity",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('check that a resource is successfully deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDelete = await helper.blogsInDb()
  expect(blogsAfterDelete).toHaveLength(helper.initial_blogs.length - 1)

  const titles = blogsAfterDelete.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

describe('test updating resources', () => {
  test.only('update blog resource', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blog = {
      likes: 150
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogsLikes = blogsAtEnd.map(r => r.likes)
    expect(blogsLikes[0]).toEqual(blog.likes)

  })
})


afterAll(() => {
  mongoose.connection.close()
})