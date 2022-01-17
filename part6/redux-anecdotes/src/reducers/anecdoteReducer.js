import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIAL_STATE':
      return action.data
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToIncrement = state.find(a => a.id === id)
      const incrementedAnecdote = {
        ...anecdoteToIncrement,
        votes: anecdoteToIncrement.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : incrementedAnecdote)
    case 'ADD_ANECDOTE':
      console.log('=====>', action)
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

export const voteAnecdote = (votedAnecdote) => {
  return async dispatch => {
    const anecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(anecdote)
    const { id } = updatedAnecdote
      dispatch({
        type: 'VOTE_ANECDOTE',
        data: { id }
    })
  }
}

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIAL_STATE',
      data: anecdotes
    })
  }
}

// const getId = () => (100000 * Math.random()).toFixed(0)

export default reducer