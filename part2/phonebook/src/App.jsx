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
    <div className="bg-zinc-950 min-h-screen w-full">
  <div>
    <h1 className="text-2xl m-5 text-center font-extrabold text-yellow-400 sm:text-3xl md:m-10">
      Phonebook
    </h1>
  </div>

  <Notification message={message} setMessage={setMessage} />

  <div className="flex flex-col items-center justify-center mt-6 px-4 sm:px-10">
    <Form
      persons={persons}
      setPersons={setPersons}
      setMessage={setMessage}
    />
  </div>

  <div className="flex flex-col items-center justify-center mt-8 px-4 sm:px-10">
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
