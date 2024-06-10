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
	if (blogs.length === 0) return null

	const likesPerAuthor = blogs.reduce((acc, blog) => {
		acc[blog.author] = (acc[blog.author] || 0) + blog.likes
		return acc
	}, {})

	let maxLikes = 0
	let authorWithMostLikes = ''

	for (const author in likesPerAuthor) {
		if (likesPerAuthor[author] > maxLikes) {
			maxLikes = likesPerAuthor[author]
			authorWithMostLikes = author
		}
	}

	return {
		author: authorWithMostLikes,
		likes: maxLikes,
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
