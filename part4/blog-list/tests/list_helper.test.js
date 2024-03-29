const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    expect(listHelper.totalLikes(blogs)).toBe(0)
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
    expect(listHelper.totalLikes(blogs)).toBe(5)
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
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []
    expect(listHelper.favoriteBlog(blogs)).toBe(null)
  })

  test('when list has only one blog, it is the favorite', () => {
    const blogs = [
      {
        title: 'Blog One',
        author: 'Author One',
        likes: 5,
      },
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
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
    expect(result).toEqual({
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
    expect(result.likes).toBe(10)
  })
})

describe('most blogs', () => {
  const blogs = [
    { author: 'Author One', likes: 5 },
    { author: 'Author Two', likes: 3 },
    { author: 'Author One', likes: 7 },
    { author: 'Author Three', likes: 2 },
    { author: 'Author One', likes: 1 },
    { author: 'Author Three', likes: 4 },
  ]

  test('author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Author One',
      blogs: 3,
    })
  })

  test('when list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })
})

describe('most likes', () => {
  const blogs = [
    { author: 'Author One', likes: 5 },
    { author: 'Author Two', likes: 10 },
    { author: 'Author One', likes: 15 },
    { author: 'Author Three', likes: 7 },
    { author: 'Author Two', likes: 4 },
    { author: 'Author Three', likes: 8 },
  ]

  test('author with the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Author One',
      likes: 20,
    })
  })

  test('when list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when all authors have equal likes', () => {
    const equalBlogs = [
      { author: 'Author One', likes: 10 },
      { author: 'Author Two', likes: 10 },
      { author: 'Author Three', likes: 10 },
    ]
    const result = listHelper.mostLikes(equalBlogs)
    expect(result.likes).toBe(10)
  })
})
