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
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }
