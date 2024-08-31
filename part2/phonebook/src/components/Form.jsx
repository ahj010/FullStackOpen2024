import { useState } from "react";
import PropTypes from 'prop-types'
import personService from '../services/person.js'

const Form = ({ persons , setPersons, setMessage}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addnewName = (event) => {
        setNewName(event.target.value)
      }

      const addNewNumber = (event) => {
        setNewNumber(event.target.value)

      }

      const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!newName || !newNumber) {
            setMessage('Please submit complete details.')
            return
        }

        const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

        if (existingPerson) {
            const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Would you like to update the contact?`)

            if (confirmUpdate) {
                const updatedPerson = { ...existingPerson, number: newNumber }

                personService.updatePerson(existingPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        // console.log('returnedPerson:', returnedPerson)
                        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
                        setMessage(`${updatedPerson.name} updated successfully`)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        console.error('Error updating person:', error)
                        setMessage(`ERROR: Information of ${existingPerson.name} has already been removed. `)
                         setTimeout(() => {
                            setMessage(null)
                                   }, 5000)
                    })
                return
            }
        }

        const personToAdd = { name: newName, number: newNumber }

        personService.create(personToAdd)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setMessage(`${personToAdd.name} successfully added! `)
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                console.error('Error adding person:', error.message)
                setMessage(`ERROR:   ${error.response.data.error}`)
                setTimeout(() => {
                     setMessage(null)
                           }, 5000)
            })
    }


 return (

   <form onSubmit={handleFormSubmit} >
    <div>
      Name: <input
        placeholder='add a new name..'
        value={newName}
        onChange={addnewName}
      />
    </div>

    <div>
      Number: <input
        placeholder='add a new number..'
        value={newNumber}
        onChange={addNewNumber}
      />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>

 )
}


Form.propTypes ={
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default Form
