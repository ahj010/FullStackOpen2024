import { useState } from 'react';

const Title = ({text}) => {
return   <h2>{text}</h2>
}

const Display = ({anecdotes , votes}) => {
  return (
    <p>{anecdotes} has {votes} votes</p>
    )
}


const Button = ({ handleAnecdote, text }) => {
  return (
    <div>
      <button onClick={handleAnecdote}>{text}</button>
    </div>
  );
};


const ResultAnecdote = ({anecdotes , votes , heading}) => {
  const maximumVotes = Math.max(...votes)
  const maxVotesIndex = votes.indexOf(maximumVotes)
  const mostVoted = anecdotes[maxVotesIndex]

  if (votes[mostVoted] === 0) {
    return (
      <>
    <h2>{heading}</h2>
    <p>No votes yet. Please vote for the best anecdote.</p>
      </>
    )
  }

  return (
    <>
      <h2>{heading}</h2>

        <p>{mostVoted} has {maximumVotes} votes</p>
      </>

  );}



    const App = () => {

      const anecdotes = [
       'If it hurts, do it more often.',
       'Adding manpower to a late software project makes it later!',
       'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
       'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
       'Premature optimization is the root of all evil.',
       'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
       'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
       'The only way to go fast, is to go well.'
      ]


  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => new Array(anecdotes.length).fill(0));

  const Randomanecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const Voteanecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };


  return (
    <div>
      <Title text = "Anecdote of the day " />
      <Display anecdotes={anecdotes[selected]} votes={votes[selected]} />
      <Button handleAnecdote={Voteanecdote} text="Vote this" />
      <Button handleAnecdote={Randomanecdote} text="Next anecdote" />
      <ResultAnecdote heading= "Anecdote with most votes" anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
