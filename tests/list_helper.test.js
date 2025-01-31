const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '9d7y191dg319dh91dh91dh0',
      title: 'Why use Javascript at all',
      author: 'Peter Pan',
      url: 'https://javascriptlover.com',
      likes: 8,
      __v: 0
    },
    {
      _id: '3ada14hrt12x61667128190',
      title: 'When should you stop sleeping?',
      author: 'Bob Flincher',
      url: 'https://sleeptherapy.com',
      likes: 3,
      __v: 0
    }
  ]
  
  test('of empty list is zero', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    assert.strictEqual(result, 16)
  })
})

describe('most likes', () => {
  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '9d7y191dg319dh91dh91dh0',
      title: 'Why use Javascript at all',
      author: 'Peter Pan',
      url: 'https://javascriptlover.com',
      likes: 8,
      __v: 0
    },
    {
      _id: '3ada14hrt12x61667128190',
      title: 'When should you stop sleeping?',
      author: 'Bob Flincher',
      url: 'https://sleeptherapy.com',
      likes: 3,
      __v: 0
    }
  ]

  test('which blog has most likes', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    assert.deepStrictEqual(result, {
      _id: '9d7y191dg319dh91dh91dh0',
      title: 'Why use Javascript at all',
      author: 'Peter Pan',
      url: 'https://javascriptlover.com',
      likes: 8,
      __v: 0
    })
  })
})
