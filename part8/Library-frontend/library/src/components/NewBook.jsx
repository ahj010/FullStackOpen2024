import { useState } from 'react'
import {  useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries/queries'
import {updateCache} from '../../src/utils'

const NewBook = ({  setErrorMessage, setBookFormDisplay, bookFormDisplay   }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  const [hideForm , setHideForm] = useState(false)

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
            console.log(response.data?.addBook)
            updateCache(cache, { query: ALL_BOOKS, ALL_AUTHORS }, response.data?.addBook)
          },
  })

  const submit = async (event) => {
    event.preventDefault()

    const genresArray = genres.split(',').map((genre) => genre.trim())
    const publishedYear = parseInt(published)


    await addBook({
      variables: {
        title: title,
        author: author,
        genres: genresArray,
        published:publishedYear
        }
       })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres('')
    setBookFormDisplay(!bookFormDisplay)
  }

  const closeForm = () => {
    setHideForm(!hideForm)
  }

  return (
       <div>
        {!hideForm &&
        <>
      <h2>Add a new book</h2>

      <form onSubmit={submit}>
        <div>
          Title: <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published:  <input value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          Genres <input value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
        </div>
        <button type='submit' >add!</button> <button onClick={closeForm}>Cancel</button>
      </form>
      </>
}
    </div>
  )
}

export default NewBook
