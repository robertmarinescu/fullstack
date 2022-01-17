export const notificationReset = () => {
  return {
    type: 'RESET'
  }
}

const notificationReducer = (state = null, action) => {
  let message = 'you voted'
  switch (action.type){
    case 'ADD_ANECDOTE':
      console.log(action.data.content)
      return action.data.content
    case 'VOTE_ANECDOTE':
      return message.concat(' ', `'${action.data.content}'`)
    case 'RESET':
      return null;
    default:
      return state
  }
}

export default notificationReducer