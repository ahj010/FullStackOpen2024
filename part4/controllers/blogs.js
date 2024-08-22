const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor, tokenExtractor } = require('../utils/middleware')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })



  blogsRouter.post('/', tokenExtractor, userExtractor,  async (request, response) => {
    const body = request.body
    const user = request.user

    if(!user){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes? body.likes : 0,
      user: user.id
    })

    try {
      if(body.title === undefined || body.url === undefined){
        response.status(400).end()
      }else{
        const savedBlog = await blog.save()
        user.blogs = await user.blogs.concat(savedBlog._id)
        // console.log('Blog saved successfully:', savedBlog) //
        await user.save()
        response.status(201).json(savedBlog)
      }
    } catch (error) {
      console.error('Error saving blog:', error)
      response.status(500).json({ error: 'Something went wrong' })
    }
  })

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {

    const user = request.user

    if(!user){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

   const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Authorization failed!' })
  }

})

blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    user: new mongoose.Types.ObjectId(request.body.user),
    title:  request.body.title,
    author: request.body.author,
    url:    request.body.url,
    likes:  request.body.likes,
  }

  const updatedBlogLikes = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlogLikes)
})

module.exports = blogsRouter
