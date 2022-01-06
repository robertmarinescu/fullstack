import React, { useState } from 'react'

const BlogView = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>

      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
}

export default BlogView
