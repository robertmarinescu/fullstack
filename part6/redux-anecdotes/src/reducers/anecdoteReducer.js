export const incrementAnecdoteVote = (id, content) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id, content }
  }
}

export const createNewAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initializeNotes = (data) => {
  return {
    type: 'INITIAL_STATE',
    data
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)


const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIAL_STATE':
      return action.data
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToIncrement = state.find(a => a.id === id)
      console.log(anecdoteToIncrement)
      const incrementedAnecdote = {
        ...anecdoteToIncrement,
        votes: anecdoteToIncrement.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : incrementedAnecdote)
    case 'ADD_ANECDOTE':
      if(action.data.content !== ''){
        return [...state, action.data]
      } else {
        console.log('The content is null')
        return state;
      }
    default:
      return state;
  }
}

export default reducer