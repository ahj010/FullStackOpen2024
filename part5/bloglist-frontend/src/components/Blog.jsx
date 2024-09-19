import { useState } from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, user, addLikes, deleteBlog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const blogDisplay = () => {
    setBlogVisible(!blogVisible)
  }


  const hideBlog = () => (
    <div className='defaultDisplay' data-testid= 'defaultDisplay'>
      <span>{blog.title} {blog.author}</span>  <button onClick={blogDisplay}>View</button>
    </div>
  )


  const showBlog = () => (

    <div className='expandedDisplay' data-testid = 'expandedDisplay'>
      {blog.title} {blog.author} <button onClick={blogDisplay}>Hide</button>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button  onClick={() => addLikes(blog.id)}> like </button></p>
      <p> {blog.user ? blog.user.name : 'Unknown'}</p>

      {blog.user.username === user.username && ( <p>  <button onClick={() => {
      // console.log('Blog User:', blog.user)
      // console.log('Logged-in User:', user)

        deleteBlog(blog.id)}}>Remove</button>  </p>)

      }

    </div>
  )


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style = {blogStyle}>
      { blogVisible ? showBlog() : hideBlog()}
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
