import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.error = action.payload.error;
    },
    clearNotification: (state) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
