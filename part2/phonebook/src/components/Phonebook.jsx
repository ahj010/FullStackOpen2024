import PropTypes from 'prop-types'
import personService from '../services/person'

const Phonebook = ({ persons, setPersons, setMessage}) => {

    const deletePerson = (id) => {
        const personToDelete = persons.find((person) => person.id === id)

        if (!personToDelete) {
            setMessage('Person not found')
            return
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)

        if (confirmDelete) {
            personService.deletePerson(personToDelete.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personToDelete.id))
                    setMessage( `${personToDelete.name} successfully deleted.`)
                })
                .catch(error => {
                    setMessage(`ERROR: ${error.name}!`)
                })
              }
    }

    return (
        <div>
            <ul>
                {persons.map(person => (
                    <li key={person.id}>
                        {person.name} : {person.number}
                        <button onClick={() => deletePerson(person.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Phonebook.propTypes = {
    persons: PropTypes.array.isRequired,
    setPersons: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired
}

export default Phonebook
