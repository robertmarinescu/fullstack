const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.username || !body.password){
    return response.status(400).json({ error: 'username or password is missing'})
  }

  if(body.username.length < 3 || body.password.length < 3){
    return response.status(400).json({ error: 'username and password must be at least 3 characters long'})
  }
  try{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
  
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception){
    next(exception)
  }
})

module.exports = usersRouter

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
    response.json(user)
  } catch (exception) {
    next(exception)
  }
})