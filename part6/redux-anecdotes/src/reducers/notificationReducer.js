const notificationReduer = (state = 'Initial Value', action) => {
  switch(action.type){
    case 'ADD_ANECDOTE':
      return action.data.content
    default:
      return state
  }
}

export default notificationReduer