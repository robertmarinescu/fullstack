import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(byLikes)))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch(appendBlog(blog))
  }
}

export default blogSlice.reducer