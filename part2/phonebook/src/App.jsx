import { useState , useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'
import personService from './services/person'


const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      console.error("Failed to fetch persons:", error)
      setPersons([])})
  }, [])

  useEffect(() => {
    if (message) {
        const timeoutId = setTimeout(() => {
            setMessage(null)
        }, 5000)

        return () => clearTimeout(timeoutId)
    }
}, [message])

  return (
     <div>
        <Notification message={message} setMessage={setMessage} />
      <h2> Phonebook </h2>
      <div>
      </div>
    <Filter persons={persons} />

    <h3> Add a new contact </h3>
    <Form
     persons={persons}
     setPersons={setPersons}
     setMessage={setMessage}
     />

    <h3> Numbers </h3>
    <Phonebook
    persons={persons}
    setPersons={setPersons}
    setMessage={setMessage}
    />

    </div>
  )
}

export default App
