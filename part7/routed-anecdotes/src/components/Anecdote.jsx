const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      has {anecdote.votes} votes
    </div>
  )
}

export default Anecdote
