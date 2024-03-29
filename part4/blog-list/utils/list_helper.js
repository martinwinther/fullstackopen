const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = null
  blogs.forEach((blog) => {
    if (!favorite || blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return favorite
    ? { title: favorite.title, author: favorite.author, likes: favorite.likes }
    : null
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorsCount = _.countBy(blogs, 'author')
  const mostBlogsAuthor = _.maxBy(
    _.keys(authorsCount),
    (author) => authorsCount[author]
  )

  return {
    author: mostBlogsAuthor,
    blogs: authorsCount[mostBlogsAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesPerAuthor = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes'),
    }))
    .value()

  return _.maxBy(likesPerAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
