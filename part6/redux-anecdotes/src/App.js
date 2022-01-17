import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'

import { initializeNotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {  
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      console.log(anecdotes)
      dispatch(initializeNotes(anecdotes))
    })
  }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App