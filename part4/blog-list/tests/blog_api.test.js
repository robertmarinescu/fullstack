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

test.only('add a valid blog into the database', async () => {
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

  const notes = await helper.notesInDb()
  expect(notes).toHaveLength(helper.initial_blogs.length + 1)

  const title = notes[2].title
  expect(title).toEqual('Gates Notes')
})

afterAll(() => {
  mongoose.connection.close()
})