import React from 'react'
import { useDispatch } from 'react-redux'
import {createNewAnecdote} from '../reducers/anecdoteReducer'
import { notificationReset } from '../reducers/notificationReducer'

function AnecdoteForm() {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNewAnecdote(content))
    setTimeout(() => {
      dispatch(notificationReset()) 
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
