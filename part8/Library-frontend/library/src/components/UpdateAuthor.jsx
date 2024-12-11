import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/queries'

const UpdateAuthor = ({ authors}) => {
  const [born , setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('');



  const [ changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = (event) => {
    event.preventDefault()


    changeBirthYear({ variables: { name: selectedAuthor, born: parseInt(born) } })

    setSelectedAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        <div>
        <label>Author:</label>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>

        </div>
        <div>
        <label>Born:</label>
        <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
