import { useState } from 'react'
import PropTypes from 'prop-types'


const Filter =  ({persons}) => {
  
    const [query, setQuery] = useState('')

    const handleSearch = (event) => {
        const query = event.target.value
        setQuery(query)
      }

        const filteredlist = persons.filter((person) =>
       ( person.name && person.name.toLowerCase().includes(query.toLowerCase()) ) ||
        (person.number && person.number.includes(query))
      )


  return (
    <div>
    <div>Search by name: <input
      value={query}
      onChange={handleSearch}
      className='search'
    />
    </div>
    <div>
      <ul>
        {   query && (filteredlist.map(person => {
        return  <li key={person.id} >{person.name} {person.number}</li>    }
        ))
        }
      </ul>
    </div>
    </div>
  ) }

Filter.propTypes = {
  persons: PropTypes.array.isRequired
}


export default Filter
