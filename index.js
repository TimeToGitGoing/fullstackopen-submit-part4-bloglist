require('dotenv').config()
const express = require('express')
const app = express()
const Blog = require('./models/blog')
const cors = require('cors')

let blogs = []

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response) => {
    Blog.findById(request.params.id)
        .then( blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/blogs', (request, response) => {
    const body = request.body

    if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    blog.save().then(savedBlog => {
        response.json(savedBlog)
    })
})

app.use(unknownEndpoint)  

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})