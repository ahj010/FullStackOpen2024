import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: "notification",
    initialState: '',
    reducers: {
        setMessage(state, action){
           return action.payload
        }
    }
})

export const {setMessage} = notificationSlice.actions
export const setNotification = (message, delay) => {
    return async dispatch => {
     await  dispatch(setMessage(message))

        setTimeout(() => {
             dispatch(setMessage(''))
        }, delay)
    }
}
export default notificationSlice.reducer
