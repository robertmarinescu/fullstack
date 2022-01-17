import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementAnecdoteVote } from '../reducers/anecdoteReducer'
import { notificationReset } from '../reducers/notificationReducer'
import Filter from './Filter'
import anecdotesService from '../services/anecdotes'
import { initializeNotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdote)

  const filter = useSelector(state => state.filter)
  console.log(filter)
  const anecdotesToShow = () => {
    if (filter === ''){
      return anecdotes
    } else {
      return anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
        )
        .sort((a, b) => (a.votes > b.votes ? -1 : 1));
    }

  };

  const vote = (id, content) => {
    dispatch(incrementAnecdoteVote(id, content))
    setTimeout(() => {
      dispatch(notificationReset()) 
    }, 5000)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      
      {anecdotesToShow().sort((a,b) => a.votes > b.votes ? - 1 : 1).map(anecdote =>
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
