const initialState = ''

export const notificationReset = () => {
  return {
    type: 'RESET'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
    case 'SET_MESSAGE':
      console.log('THIS IS IN REDUCER: ', action.data.message)
      clearTimeout(state.delay)
      return action.data
    case 'REMOVE_MESSAGE':
      return initialState;
    default:
      return state
  }
}

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message,
        delay: setTimeout(() => {
          dispatch(removeNotification(''))
        }, delay * 1000)
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_MESSAGE'
  }
}

export default notificationReducer