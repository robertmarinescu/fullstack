import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, deleteBlog}) => {
  const [visible, setVisible] = useState(false)
  const [like, setLike] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const viewBlogDetails = () => {
    setVisible(!visible)
  }
  
  const addLike = () => {
    let id = blog.id
    let likes = blog.likes + 1
    const newObject = {
      user: blog.user.id,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService
      .update(id, newObject)
      .then(()=> setLike(likes))
  }

  const removeBlog = () => {
    let id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      deleteBlog(id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => viewBlogDetails()}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{like} <button onClick={() => addLike()}>like</button></p>
        <p>{blog.user?.name ? blog.user.name : 'no owner'}</p>
        <button onClick={() => removeBlog()}>remove</button>
      </div>  
    </div>
  )
}
export default Blog