import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const viewBlogDetails = () => {
    setVisible(!visible)
  }
  
  const addLike = () => {
    console.log('+1')
  }

  return (
    <div style={{...blogStyle}}>
      <div>
        {blog.title} {blog.author} <button onClick={() => viewBlogDetails()}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => addLike()}>like</button></p>
        <p>{blog.user?.name ? blog.user.name : 'no owner'}</p>
      </div>  
    </div>
  )
}
export default Blog