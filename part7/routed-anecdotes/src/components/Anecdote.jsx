const Anecdote = ({anecdote, likeAnecdote}) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      has {anecdote.votes} votes

      <button onClick={() => likeAnecdote(anecdote.id)}>Vote</button>
    </div>
  )
}

export default Anecdote
