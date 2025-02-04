require('dotenv').config();
const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Awaiter',
        url: 'www.awaiter.com',
        likes: 4,
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(n => n.title)
})

test('blog without content is not added', async () => {
    const newBlog = {}
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(blog => {
        assert.ok(blog.id, 'blog must have an id property')
        assert.strictEqual(typeof blog.id, 'string', 'id must be a string')
        assert.strictEqual(blog._id, undefined, '._id should not be present')
    })
})

after(async () => {
    await mongoose.connection.close()
})