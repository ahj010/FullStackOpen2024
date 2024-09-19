const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
		return sum + item
	}

	const blogsLikes = blogs.map(blog => blog.likes)

   return  blogs.length === 0 ? 0 :  blogsLikes.reduce(reducer, 0)

}


function favouriteBlog(blogs) {
  const favorite = blogs.reduce((favorite, current) => {
   return  (current.likes > (favorite.likes || 0)) ? current : favorite
    }, {})

    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    }
}

function mostBlogs(blogs){
  const allAuthors = lodash.groupBy(blogs , 'author')
  const authorBlogsCount = lodash.map(allAuthors, (blogs, author) => {
    return {
      author: author,
      blogs: blogs.length
    }
  })
  const topAuthor = lodash.maxBy(authorBlogsCount, 'blogs')
  return topAuthor
}

function mostLikes(blogs) {
  const allAuthors = lodash.groupBy(blogs , 'author')
  const authorLikesCount = lodash.map(allAuthors, (blogs, author) => {
    return {
      author: author,
      likes: lodash.sumBy(blogs, 'likes')
    }
  })
  const topAuthor = lodash.maxBy(authorLikesCount, 'likes')
  return topAuthor
}

  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }
