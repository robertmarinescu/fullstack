const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, currentValue) => {
        return total + currentValue.likes
    }, 0)

    return total
}

const favoriteBlog = (blogs) => {
    if(!blogs || blogs.length === 0) return null;
    const blog = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    return blog;
}

const mostBlogs = (blogs) => {
    const listOfAuthors = blogs.reduce((acc, current) => {
        if(acc[current.author]){
            acc[current.author]++;
        } else {
            acc[current.author] = 1;
        }
        return acc;
    }, {})

    const authors = []
    for(const property in listOfAuthors){
        let obj = {}
        obj['author'] = property;
        obj['blogs'] = listOfAuthors[property]
        authors.push(obj);
    }

    const author = authors.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })
    return author;
}

// console.log(mostBlogs(blogs))

const mostLikes = (blogs) => {
    const listOfAuthors = blogs.reduce((acc, current) => {
        if(acc[current.author]){
            acc[current.author] = acc[current.author] + current.likes;
        } else {
            acc[current.author] = current.likes;
        }
        return acc;
    }, {})

    const authors = []
    for (const property in listOfAuthors){
        let obj = {}
        obj['author'] = property;
        obj['likes'] = listOfAuthors[property]
        authors.push(obj)
    }

    const author = authors.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    return author;
}

// console.log(mostLikes(blogs))

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}