const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}