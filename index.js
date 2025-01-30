const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))

let blogs = [
    {
        id: "1",
        title: "HTML is easy",
        author: "johnny bravo",
        url: "www.johnnybravo.com",
        likes: "19",
    },
    {
        id: "2",
        title: "Browser can execute javascript",
        author: "javascript lover",
        url: "www.javascriptlife.com",
        likes: "3",
    },
    {
        id: "3",
        title: "GET and POST are important HTTP Protocols",
        author: "postperson",
        url: "www.poster.com",
        likes: "5",
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/blogs', (request, response) => {
    response.json(blogs)
})

app.get('/api/blogs/:id', (request, response) => {
    const id = request.params.id
    const blog = blogs.find(blog => blog.id === id)
    
    if (blog) {
        response.json(blog)
    } else {
        response.status(400).end()
    }
})

app.delete('/api/blogs/:id', (request, response) => {
    const id = request.params.id
    blogs = blogs.filter(blog => blog.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = blogs.length > 0
        ? Math.max(...blogs.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/blogs', (request, response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).json({ 
            error: 'title missing' 
        })
    }

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: generateId(),
    }

    blogs = blogs.concat(blog)

    response.json(blog)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})