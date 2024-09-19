import axios from 'axios'

const baseUrl ='http://localhost:3001/anecdotes'

export const getAnecdotes  =async () =>  await axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async newAnecdote => {
    await axios.post(baseUrl, newAnecdote).then(response => response.data)
}

export const updateAnecdote = async updateAnecdote =>{
  await axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data)
}
