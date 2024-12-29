import { useState , useEffect } from 'react'
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
      console.error("Failed to fetch persons:", error.message)
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
     <div className='bg-zinc-950 w-screen h-full '>
      <div>
      <h1 className='text-2xl m-5 text-center pr-10 font-extrabold font-sans text-yellow-400'> Phonebook </h1>
      </div>
        <Notification message={message} setMessage={setMessage} />

    <div>
    <Form
     persons={persons}
     setPersons={setPersons}
     setMessage={setMessage}
     />
    </div>

    <div>
    <Phonebook
    persons={persons}
    setPersons={setPersons}
    setMessage={setMessage}
    />
    </div>

    </div>
  )
}

export default App
