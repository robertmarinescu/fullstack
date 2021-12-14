const Blog = require('../models/blog')
const initial_blogs = [
  {
    title: "Just a casual blog",
    author: "Robert Marinescu",
    url: "http://www.robertmarinescu.com",
    likes: 37
  },
  {
    title: "Testing the apis",
    author: "John Smith",
    url: "http://www.johnsmith.com",
    likes: 63
  }
]

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initial_blogs, notesInDb }