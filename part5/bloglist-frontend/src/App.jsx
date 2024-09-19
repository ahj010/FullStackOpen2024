import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes) )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }else if(!user){
      setUser(null)
    }
  }, [user])

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Hello ${user.name}, Welcome back to your blogs!`)
      setTimeout(() => {setMessage(null)}, 5000)

    } catch (exception){
      if (exception.response && exception.response.status === 401) {
        setError('Token expired. You are requested to login again.')
        setUser(null)
      }
      setError('Invalid username or password')
      setTimeout(() => {setError(null)}, 5000)
    }
  }

  const addBlog = async (blogObject) => {

    // console.log('Adding blog:', blogObject)

    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      setError('Creation failed! Please provide complete information')
      setTimeout(() => setError(null), 5000)
      return
    }

    try {
      const createdBlog = await blogService.create(blogObject)

      // console.log('Created blog:', createdBlog)

      setBlogs(blogs.concat(createdBlog).sort((a, b) => b.likes - a.likes))
      setMessage(`A new blog "${createdBlog.title}" by ${createdBlog.author} added`)
      setTimeout(() => { setMessage(null) }, 5000)

    } catch (error) {
      // console.error('Error creating blog:', error)
      setError(`An error occurred: ${error.message}`)
      setTimeout(() => { setError(null) }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const updateBlogLikes = async (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    if (!blogToUpdate) return

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id === id ? { ...returnedBlog, user: blogToUpdate.user } : blog).sort((a, b) => b.likes - a.likes))
      setMessage(`You liked the blog '${blogToUpdate.title}' by ${blogToUpdate.author}`)
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setError(`${error}`)
      setBlogs(blogs.filter(n => n.id === id))
      setTimeout(() => setError(null), 5000)
    }
  }


  const deleteBlog = (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)
    const confirmDeletion = window.confirm(`Deleting the blog ${blogToDelete.title} by ${blogToDelete.author}`)
    try{
      if(confirmDeletion){
        blogService.deleteBlog(blogToDelete.id)
          .then(() => {
            setBlogs(blogs.filter(blog => blog.id !== id).sort((a,b) => b.likes - a.likes))
            setMessage(`Succesfully deleted the blog '${blogToDelete.title}' by ${blogToDelete.author}`)
            setTimeout(() => setMessage(null), 5000)
          })
      }
    }catch(error) {
      setMessage(`An error occurred: ${error.message}`)
      setTimeout(() => setMessage(null), 5000)
    }
  }


  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} error={error}/>
      {user === null ?
        <LoginForm handleLogin={handleLogin} /> :
        <div>
          <p>{user.name} logged-in</p>  <button type="submit" onClick={handleLogout}>Logout</button>

          <BlogForm addBlog={addBlog} />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLikes={updateBlogLikes} deleteBlog={deleteBlog}/>
          )}
        </div>

      }
    </div>

  )
}

export default App
