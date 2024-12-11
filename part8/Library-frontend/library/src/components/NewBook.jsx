// import { useState } from 'react'
// import {  useMutation } from '@apollo/client'
// import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK } from '../queries/queries'
// import { updateCache } from '../App'


// const NewBook = (props) => {
//   const [title, setTitle] = useState('')
//   const [author, setAuthor] = useState('')
//   const [published, setPublished] = useState('')
//   const [genre, setGenre] = useState('')
//   const [genres, setGenres] = useState([])



//   const [ addBook ] = useMutation(ADD_BOOK, {
//     refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
//     onError: (error) => {
//       const errorMessage = error.graphQLErrors[0];
//       props.setErrorMessage(errorMessage);
//     },

//     update: (cache, response) => {
//       console.log("Huhuhaa:",response.data.addBook)
//       updateCache(cache, { query: ALL_BOOKS, ALL_AUTHORS }, response.data.addBook)
//     },

//   })


//   // const submit = async (event) => {
//   //   event.preventDefault()


//   //   const publishedYear = parseInt(published)
//   //   console.log({ title, author, genres, published: publishedYear });


//   //   await addBook({
//   //     variables: {
//   //       title,
//   //       author,
//   //       genres,
//   //       published:publishedYear
//   //       }
//   //      })

//   //   setTitle('')
//   //   setPublished('')
//   //   setAuthor('')
//   //   setGenres([])
//   //   setGenre('')
//   // }

//   const submit = async (event) => {
//     event.preventDefault();

//     const publishedYear = parseInt(published);
//     // const genresArray = genres.split(',').map((genre) => genre.trim())


//     console.log({ title, author, genres, published: publishedYear });

//     try {
//       await addBook({
//         variables: {
//           title,
//           author,
//           genres,
//           published: publishedYear,
//         },
//       });

//       setTitle('');
//       setPublished('');
//       setAuthor('');
//       setGenres([]);
//       setGenre('');
//     } catch (error) {
//       console.error("Error while adding a book:", error.message);
//       props.setErrorMessage(error.message);
//     }
//   };


//   const addGenre = () => {
//     setGenres(genres.concat(genre))
//     setGenre('')
//   }

//   return (
//     <div>
//       <h2>Add a new book</h2>
//       <form onSubmit={submit}>
//         <div>
//           title
//           <input
//             value={title}
//             onChange={({ target }) => setTitle(target.value)}
//           />
//         </div>
//         <div>
//           author
//           <input
//             value={author}
//             onChange={({ target }) => setAuthor(target.value)}
//           />
//         </div>
//         <div>
//           published
//           <input
//             type="number"
//             value={published}
//             onChange={({ target }) => setPublished(target.value)}
//           />
//         </div>
//         <div>
//           <input
//             value={genre}
//             onChange={({ target }) => setGenre(target.value)}
//           />
//           <button onClick={addGenre} type="button">
//             add genre
//           </button>
//         </div>
//         <div>genres: {genres.join(' ')}</div>
//         <button type="submit">create book</button>
//       </form>
//     </div>
//   )
// }

// export default NewBook


import { useState } from 'react'
import {  useMutation } from '@apollo/client'
import {updateCache} from '../App'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries/queries'

const NewBook = ({setErrorMessage, setBookFormDisplay, bookFormDisplay   }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  const [hideForm , setHideForm] = useState(false)

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
      console.log(error);

    },
    // update:  (cache, { data: { addBook } }) => {
    //    cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks  }) => {
    //     return {
    //       allBooks: allBooks.concat(addBook)
    //     }
    //   })
    //     cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    //       const authorExists = allAuthors.some((author) => author.name === addBook.author.name)
    //       if (authorExists) {
    //         return {
    //           allAuthors: allAuthors.map(author =>
    //             author.name === addBook.author.name
    //               ? { ...author, bookCount: author.bookCount + 1 }
    //               : author
    //           )
    //         }
    //       }
    //       else {
    //         return {
    //           allAuthors: allAuthors.concat(addBook.author)
    //         };
    //       }
    //   })
    // }

    update: (cache, response) => {
            console.log("Huhuhaa:",response.data?.addBook)
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
