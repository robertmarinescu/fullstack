import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/loginService'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedOnUserJson = window.localStorage.getItem('loggedOnAppBlogList')
    if(loggedOnUserJson){
      const user = JSON.parse(loggedOnUserJson)
      setUser(user)
      blogService.setToken(user.token)
      fetchBlogs()
    } 
  }, [])

  const fetchBlogs = () => {
    blogService.getAll().then(blogs =>{
      console.log(blogs)
      setBlogs(blogs)
    }) 
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedOnAppBlogList', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      fetchBlogs()
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    window.localStorage.removeItem('loggedOnAppBlogList')
    setUser(null)
  }

  const addBlog = blogObject => {
    blogService.create(blogObject).then(blogObject => setBlogs(blogs.concat(blogObject)))
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    fetchBlogs()
  }

  const loginForm = () => {
    if(user === null) {
      return (
       <div>
         <h2>Log in to application</h2>
         <form onSubmit={handleLogin}>
           <div>
             username
               <input
               type="text"
               value={username}
               name="Username"
               onChange={({ target }) => setUsername(target.value)}
             />
           </div>
           <div>
             password
               <input
               type="password"
               value={password}
               name="Password"
               onChange={({ target }) => setPassword(target.value)}
             />
           </div>
           <button type="submit">login</button>
         </form>
       </div> 
      )
    }
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged-in <button onClick={handleLogOut}>logout</button></p>
        <Togglable buttonLabel='new blog'>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div> 
      </div>
    )  
  }

  return (
    <div>
      <Notification message={message} />
      {loginForm()}

    </div>
  )
}

export default App