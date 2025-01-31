const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0 ) return 0
    
    return blogs.reduce((maxBlog, currentBlog) =>
        currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}