const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if(request.token === null){
    console.log('THE TOKEN IS NULL')
    return response.status(401).json({error: 'token missing or invalid'})
  } else {
    console.log('THE TOKEN IS NOT NULL =>>>>', request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('This is the decoded token', decodedToken)
    if(!request.token || !decodedToken || !decodedToken.id) {
      request.user = null;
      // return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const user = await User.findById(decodedToken.id)
      request.user = user
      next()
    }
  }

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}