import { useState } from 'react'
import PropTypes from 'prop-types'

const Title = ({ text }) => {
  return <h2>{text}</h2>
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}

const Button = ({handleClick , text}) => {
  return (
  <button onClick={handleClick}>
{text}
  </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const Stat = ({text , value}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>

      </tr>
    )
}

Stat.propTypes = {
text: PropTypes.string.isRequired,
value: PropTypes.oneOfType([
   PropTypes.number,
  PropTypes.string
])
}

const Statistics = ({title , options : {good , neutral , bad}}) => {

  const total = good + neutral + bad
  const average = good > 0 || bad > 0 ? (good - bad)/ total :  0
  const positive = good > 0 ? good/total * 100 + "%" : 0

  if (total === 0 ){
    return (
      <>
<Title text ={title} />
<p>No feedback is given</p>
      </>
    )
  }
  return(
     <>
     <Title text={title}/>
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


Statistics.propTypes ={
  title: PropTypes.string.isRequired,
  options: PropTypes.shape({
    good: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
    neutral : PropTypes.number.isRequired
  }).isRequired
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
