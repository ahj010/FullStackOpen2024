import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
      state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action){
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
 return async dispatch => {
 const anecdotes =  await anecdoteService.getAll()
 await anecdotes.sort((a,b) => b.votes - a.votes)
  dispatch(setAnecdote(anecdotes))
}
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    return dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer
