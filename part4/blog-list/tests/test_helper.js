const Blog = require('../models/blog')
const User = require('../models/user')
const initial_blogs = [
  {
    title: 'Just a casual blog',
    author: 'Robert Marinescu',
    url: 'http://www.robertmarinescu.com',
    likes: 37
  },
  {
    title: 'Testing the apis',
    author: 'John Smith',
    url: 'http://www.johnsmith.com',
    likes: 63
  }
]

const initial_users = [
  {
    username: 'johnsmith',
    name: 'John Smith',
    password: 'john'
  },
  {
    username: 'bradpitt',
    name: 'Brad Pitt',
    password: 'brad'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initial_blogs, initial_users, blogsInDb, usersInDb }