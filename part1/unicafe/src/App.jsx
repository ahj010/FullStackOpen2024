import { useState } from 'react'

const Title = ({ text }) => {
  return <h2>{text}</h2>
}


const Button = ({handleClick , text}) => {
  return (
  <button onClick={handleClick}>
{text}
  </button>
  )
}

const Stat = ({text , value}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>

      </tr>
    )
}


const Statistics = ({title , options : {good , neutral , bad}}) => {

  const total = good + neutral + bad
  const average = good > 0 || bad > 0 ? (good - bad)/ total :  0
  const positive = good > 0 ? good/total * 100 + "%" : 0

  if (total === 0 ){
    return (
      <>
<Title>{title}</Title>
<p>No feedback is given</p>
      </>
    )
  }
  return(
     <>
     <Title>{title}</Title>
<table>
   <tbody>
<Stat text = "Good" value={good} />
<Stat text = "Neutral" value={neutral} />
<Stat text = "Bad" value={bad} />
<Stat text = "Total" value={total} />
<Stat text = "Average" value={average} />
<Stat text = "Positive" value={positive} />

   </tbody>
 </table>
 </>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>

<Title text= "Time for a quick feedback"/>
<Button handleClick={() => setGood(good + 1)} text= 'Good'/>
<Button handleClick={() => setNeutral(neutral + 1)} text= 'Neutral' />
<Button handleClick={() => setBad(bad + 1)} text= 'Bad' />
<Statistics title="statistics" options={{ good, neutral, bad }}/>

    </div>
  )
}

export default App
