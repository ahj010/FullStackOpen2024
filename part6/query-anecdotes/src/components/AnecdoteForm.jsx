import { useMutation , useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request';
import { useNotificationDispatch } from '../hooks/useNotification';


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatch({type: 'DISPLAY', payload: `an error occured while creating the anecdote. ${error}`})
      console.log("creation error",error);

      setTimeout(() => {
        dispatch({type: 'HIDE', payload: ''})
      }, 5000)
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      dispatch({type: 'DISPLAY', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatch({type: 'HIDE', payload: ''})
      }, 5000)
      return
    }
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({type: 'DISPLAY' , payload: `you created "${content}" `})
    setTimeout(() => {
      dispatch({type: 'HIDE', payload: ''})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
