import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import Books from "./components/Books";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import UpdateAuthor from "./components/UpdateAuthor";
import LoginForm from './components/LoginForm';
import Notify from './components/Notify';
import Recommended from './components/Recommended';
import { ALL_BOOKS, ALL_AUTHORS, USER, BOOK_ADDED  } from './queries/queries';
import { updateCache } from "./utils";

const App = () => {
  const [bookFormDisplay, setBookFormDisplay] = useState(false)
  const [authorDisplay, setAuthorDisplay] = useState(false)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [recommended, setRecommended] = useState(false)


  const resultBooks = useQuery(ALL_BOOKS, { skip: !token })
  const resultAuthors = useQuery(ALL_AUTHORS, { skip: !token })
  const resultUser = useQuery(USER, { skip: !token })

  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('Library-user-token');
    if (savedToken) {
      setToken(savedToken);
      setBookFormDisplay(false);
    setAuthorDisplay(false);
    setRecommended(false);
    }
  }, []);

  useEffect(() => {
    if (!recommended && !bookFormDisplay && !authorDisplay) {
      resultBooks.refetch();
    }
  }, [recommended, bookFormDisplay, authorDisplay, resultBooks]);

    useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      if(!data){
        return ;
      }
      const addedBook = data.data.bookAdded
      try {
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)}
      catch {
        console.log('error')
      }

      }
  })

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>loading...</div>
  }

  if (resultBooks.error || resultAuthors.error) {
    return <div>error...</div>
  }

  const books = resultBooks.data?.allBooks || []

  const authors = resultAuthors.data?.allAuthors || []


  const notify = (message) => {
    setErrorMessage(message)
    if(!token){
      setErrorMessage('Unauthenticated. Please log in first.')
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    notify("You have been logged out.");
  }



  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setErrorMessage={notify}
        />
      </div>
    )
  }


  return (
    <div>
      <nav>
        <button
          onClick={() => {
            setBookFormDisplay(true);
            setAuthorDisplay(false);
            setRecommended(false);
          }}
        >
          Create new
        </button>
        <button
          onClick={() => {
            setBookFormDisplay(false);
            setAuthorDisplay(true);
            setRecommended(false);
          }}
        >
          Authors
        </button>
        <button
          onClick={() => {
            setBookFormDisplay(false);
            setAuthorDisplay(false);
            setRecommended(true);
          }}
        >
          Recommended
        </button>
        {(bookFormDisplay || authorDisplay || recommended) && (
          <button
            onClick={() => {
              setBookFormDisplay(false);
              setAuthorDisplay(false);
              setRecommended(false);
            }}
          >
            Books
          </button>
        )}
        {token && <button onClick={logout}>Logout</button>}
      </nav>

      {errorMessage && <Notify errorMessage={errorMessage} />}

      {bookFormDisplay && <NewBook setErrorMessage={notify} setBookFormDisplay={setBookFormDisplay}
       bookFormDisplay={bookFormDisplay}/>}
      {authorDisplay && (
        <>
          <Authors authors={authors} />
          <UpdateAuthor authors={authors} setErrorMessage={notify} />
        </>
      )}
      {!bookFormDisplay && !authorDisplay && !recommended && books && (
        <Books books={books} />
      )}
      {recommended && <Recommended user={resultUser.data.me} books={books} />}
    </div>
  );

}

export default App
