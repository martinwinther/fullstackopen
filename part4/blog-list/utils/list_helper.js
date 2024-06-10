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
	if (!blogs.length) return null

	const authorCounts = {} // To store the count of each author's blogs
	blogs.forEach((blog) => {
		if (authorCounts[blog.author]) {
			authorCounts[blog.author]++
		} else {
			authorCounts[blog.author] = 1
		}
	})

	let maxBlogs = 0
	let authorWithMostBlogs = ''

	for (const author in authorCounts) {
		if (authorCounts[author] > maxBlogs) {
			maxBlogs = authorCounts[author]
			authorWithMostBlogs = author
		}
	}

	return {
		author: authorWithMostBlogs,
		blogs: maxBlogs,
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
