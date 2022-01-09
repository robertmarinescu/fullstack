import React, { useState } from 'react'
// import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog, updateBlogLikes }) => {
  const [visible, setVisible] = useState(false)
  // const [like, setLike] = useState(blog.likes)

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

  const updateLike = () => {
    let id = blog.id
    // let likes = like + 1
    const newObject = {
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlogLikes(id, newObject)
    // blogService
    //   .update(id, newObject)
    //   .then(() => setLike(likes))
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
        <span className='blogTitle'>{blog.title}</span>
        <span className='blogAuthor'>{blog.author}</span>
        <button className='toggleVisibilityButton' onClick={() => viewBlogDetails()}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='hiddenContent'>
        <p className='blogUrl'>{blog.url}</p>
        <p className='blogLikes'>{blog.likes} <button onClick={() => updateLike()}>like</button></p>
        <p className='blogUser'>{blog.user?.name}</p>
        {/* <p>{blog.user?.name ? blog.user.name : 'no owner'}</p> */}
        <button className='removeBlog' onClick={() => removeBlog()}>remove</button>
      </div>
    </div>
  )
}
export default Blog