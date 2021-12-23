const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middlewares')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
  .then(result => logger.info('connected to MongoDB'))
  .catch(error => logger.info('error connecting to MongoDB', error.message))

app.use(express.json())
// app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app