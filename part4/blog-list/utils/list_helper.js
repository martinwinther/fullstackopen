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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
