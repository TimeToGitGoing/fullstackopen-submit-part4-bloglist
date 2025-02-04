const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
        } catch(error) {
            next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title and URL are required' })
    }
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
  
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter