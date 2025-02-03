require('dotenv').config();
const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'WOOHOOO MORE TITLES!!!',
        author: 'Victor Rue',
        url: 'www.moviesfinder.com',
        likes: 4,
    },
    {
        title: 'Is 4 hours of sleep enough?',
        author: 'Sleep Wizard',
        url: 'www.sleepwizardry.com',
        likes: 5,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, initialBlogs.length)
})
  
test('the first blog is about titles', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert(contents.includes('WOOHOOO MORE TITLES!!!'))
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})