import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      state.notification = content
    }
  }
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer