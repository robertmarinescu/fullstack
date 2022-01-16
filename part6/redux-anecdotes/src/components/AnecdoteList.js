import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementAnecdoteVote } from '../reducers/anecdoteReducer'
import { notificationReset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(incrementAnecdoteVote(id, content))
    setTimeout(() => {
      dispatch(notificationReset()) 
    }, 5000)
  }

  const anecdotes = useSelector(state => state.anecdote)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => a.votes > b.votes ? - 1 : 1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
