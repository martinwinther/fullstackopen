const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
	test('of empty list is zero', () => {
		const blogs = []
		assert.strictEqual(listHelper.totalLikes(blogs), 0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const blogs = [
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
		]
		assert.strictEqual(listHelper.totalLikes(blogs), 5)
	})

	test('of a bigger list is calculated right', () => {
		const blogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0,
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0,
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0,
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0,
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0,
			},
		]
		assert.strictEqual(listHelper.totalLikes(blogs), 36)
	})
})

describe('favorite blog', () => {
	test('of empty list is null', () => {
		const blogs = []
		assert.strictEqual(listHelper.favoriteBlog(blogs), null)
	})

	test('when list has only one blog, it is the favorite', () => {
		const blogs = [{ title: 'Blog One', author: 'Author One', likes: 5 }]
		const result = listHelper.favoriteBlog(blogs)
		assert.deepStrictEqual(result, {
			title: 'Blog One',
			author: 'Author One',
			likes: 5,
		})
	})

	test('of a bigger list is the one with most likes', () => {
		const blogs = [
			{ title: 'Blog One', author: 'Author One', likes: 5 },
			{ title: 'Blog Two', author: 'Author Two', likes: 10 },
			{ title: 'Blog Three', author: 'Author Three', likes: 3 },
		]
		const result = listHelper.favoriteBlog(blogs)
		assert.deepStrictEqual(result, {
			title: 'Blog Two',
			author: 'Author Two',
			likes: 10,
		})
	})

	test('when multiple blogs have same highest likes, return one of them', () => {
		const blogs = [
			{ title: 'Blog One', author: 'Author One', likes: 10 },
			{ title: 'Blog Two', author: 'Author Two', likes: 10 },
			{ title: 'Blog Three', author: 'Author Three', likes: 3 },
		]
		const result = listHelper.favoriteBlog(blogs)
		assert.strictEqual(result.likes, 10)
	})
})

describe('most blogs', () => {
	test('finds the author with the most blogs', () => {
		const blogs = [
			{ author: 'Robert C. Martin', likes: 10 },
			{ author: 'Robert C. Martin', likes: 7 },
			{ author: 'Edsger W. Dijkstra', likes: 5 },
			{ author: 'Robert C. Martin', likes: 12 },
		]
		const result = listHelper.mostBlogs(blogs)
		assert.deepStrictEqual(result, {
			author: 'Robert C. Martin',
			blogs: 3,
		})
	})

	test('returns null for an empty array', () => {
		const blogs = []
		const result = listHelper.mostBlogs(blogs)
		assert.strictEqual(result, null)
	})

	test('when multiple authors have the same number of blogs, returns any of them', () => {
		const blogs = [
			{ author: 'Robert C. Martin', likes: 10 },
			{ author: 'Edsger W. Dijkstra', likes: 5 },
			{ author: 'Robert C. Martin', likes: 12 },
			{ author: 'Edsger W. Dijkstra', likes: 10 },
		]
		const result = listHelper.mostBlogs(blogs)
		assert.strictEqual(result.blogs, 2)
	})
})

describe('most likes', () => {
	test('finds the author with the most likes', () => {
		const blogs = [
			{ author: 'Robert C. Martin', likes: 10 },
			{ author: 'Robert C. Martin', likes: 20 },
			{ author: 'Edsger W. Dijkstra', likes: 17 },
			{ author: 'Edsger W. Dijkstra', likes: 5 },
		]
		const result = listHelper.mostLikes(blogs)
		assert.deepStrictEqual(result, {
			author: 'Robert C. Martin',
			likes: 30,
		})
	})

	test('returns null for an empty array', () => {
		const blogs = []
		const result = listHelper.mostLikes(blogs)
		assert.strictEqual(result, null)
	})

	test('when multiple authors have the same amount of top likes, returns any of them', () => {
		const blogs = [
			{ author: 'Robert C. Martin', likes: 25 },
			{ author: 'Edsger W. Dijkstra', likes: 17 },
			{ author: 'Robert C. Martin', likes: 5 },
			{ author: 'Edsger W. Dijkstra', likes: 13 },
		]
		const result = listHelper.mostLikes(blogs)
		assert.strictEqual(result.likes, 30)
	})
})
