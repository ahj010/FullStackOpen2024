const commentRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id });
  response.json(comments);
});

commentRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  if (body.content === undefined) {
    response.status(400).end();
  } else {
    const savedComment = await comment.save();
    response.status(201).json(savedComment);
  }
});

module.exports = commentRouter;
