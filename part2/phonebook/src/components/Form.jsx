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
  // <div className='bg-yellow-500 flex justify-center items-center rounded w-full  p-6'>
  // <div className="flex flex-col items-center justify-center p-5 rounded shadow-none hover:shadow-md w-1/2 ">
  // <h3 className="text-lg font-bold text-center mb-4 mr-3">Add a new contact</h3>
  //   <form onSubmit={handleFormSubmit} className="flex flex-row items-center justify-center" >
  //   <div className="flex flex-auto flex-wrap items-center font-semibold  ">
  //     <label htmlFor="name" className="m-1 "> Name: </label>
  //     <input
  //       id="name"
  //       placeholder=' new name.. '
  //       value={newName}
  //       onChange={addnewName}
  //       className="bg-stone-200 rounded-md px-4 py-1 m-2 w-full"
  //     />
  //   </div>

  //   <div className="flex flex-row items-center font-semibold  ">
  //   <label htmlFor="number" className="m-1">Number:</label>
  //   <input
  //       id="number"
  //       placeholder='00-000000'
  //       value={newNumber}
  //       onChange={addNewNumber}
  //       className="bg-stone-200 rounded-md px-6 py-1 m-2 w-full"
  //     />
  //   </div>

  //   <div>
  //     <button type="submit" className="bg-black text-white opacity-100 hover:bg-opacity-5 rounded-md px-2 py-1 m-2">Add</button>
  //   </div>
  // </form>
  // </div>
  // </div>

  <div className='bg-yellow-500 flex justify-center items-center rounded w-full p-4 sm:p-6'>
  <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded shadow-none hover:shadow-md w-full sm:w-2/3 md:w-1/2">
    <h3 className="text-lg font-bold text-center mb-4">Add a new contact</h3>
    <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row items-center justify-center w-full">
      <div className="flex flex-col sm:flex-row items-center font-semibold w-full sm:w-1/2 px-2">
        <label htmlFor="name" className="m-1 text-center sm:text-left">Name:</label>
        <input
          id="name"
          placeholder="New name..."
          value={newName}
          onChange={addnewName}
          className="bg-stone-200 rounded-md px-4 py-1 m-2 w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center font-semibold w-full sm:w-1/2 px-2">
        <label htmlFor="number" className="m-1 text-center sm:text-left">Number:</label>
        <input
          id="number"
          placeholder="00-000000"
          value={newNumber}
          onChange={addNewNumber}
          className="bg-stone-200 rounded-md px-4 py-1 m-2 w-full"
        />
      </div>

      <div className="flex justify-center w-full sm:w-auto">
        <button type="submit" className="bg-black text-white hover:bg-opacity-90 rounded-md px-4 py-1 m-2">
          Add
        </button>
      </div>
    </form>
  </div>
</div>

 )
}


Form.propTypes ={
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default Form
