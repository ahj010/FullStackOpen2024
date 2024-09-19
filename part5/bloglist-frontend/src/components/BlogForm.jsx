import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const handleSubmit =  (event) => {
    event.preventDefault()
    const blogObject = { title: title, author: author, url: url }
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const toggleVisibility = () => {
    setLoginVisible(!loginVisible)
  }


  return(
    <div>
      {!loginVisible ? (
        <button onClick={toggleVisibility}>Create a new blog</button>
      ) :
        <form onSubmit={handleSubmit}>
          <h2>New blog</h2>

          <div>
      Title: <input
              data-testid = "title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div>
Author: <input
              data-testid = "author"
              value={author}
              onChange={handleAuthorChange}
            />
          </div>

          <div>
Url: <input
              data-testid = "url"
              value={url}
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit" >save</button>  <button type="button" onClick={toggleVisibility}>Cancel</button>
        </form>}
    </div>
  )
}

export default BlogForm
