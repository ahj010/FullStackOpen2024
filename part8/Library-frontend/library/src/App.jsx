import { useQuery, useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";
import Books from "./components/Books";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import UpdateAuthor from "./components/UpdateAuthor";
import LoginForm from './components/LoginForm';
import Notify from './components/Notify';
import Recommended from './components/Recommended';
import { ALL_BOOKS, ALL_AUTHORS, USER } from './queries/queries';


const App = () => {
  const [bookFormDisplay, setBookFormDisplay] = useState(false)
  const [authorDisplay, setAuthorDisplay] = useState(false)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [recommended, setRecommended] = useState(false)


  const resultBooks = useQuery(ALL_BOOKS, { skip: !token })
  // console.log("Result Books: " ,resultBooks)
  const resultAuthors = useQuery(ALL_AUTHORS, { skip: !token })
  // console.log("Result Authors: " ,resultAuthors)
  const resultUser = useQuery(USER, { skip: !token })

  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('Library-user-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data?.allBooks || []

  const authors = resultAuthors.data?.allAuthors || []

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
      <div>
      <Notify errorMessage={errorMessage} />
      </div>

      <nav>
        <button onClick={() => setBookFormDisplay(!bookFormDisplay)}>Create new</button>
        <button onClick={() => setAuthorDisplay(!authorDisplay)}>Authors</button>
        <button onClick={() => setRecommended(!recommended)}>Recommended</button>

        {(bookFormDisplay || authorDisplay) && (
      <button onClick={() => {
        setBookFormDisplay(false);
        setAuthorDisplay(false);
      }}>Books</button>
    )}

      {
        token && ( <button onClick={logout}>logout</button>)
       }
      </nav>

      {
       bookFormDisplay && <NewBook setErrorMessage={notify} />
      }

      {
       authorDisplay &&
          <>
          <Authors authors={authors}/>
          <UpdateAuthor authors={authors} setErrorMessage={notify}/>
          </>
        }

    {!bookFormDisplay && !authorDisplay && <Books books={books} />}

    { recommended && <Recommended user={resultUser.data?.me} books={books}/>}
    </div>

  )
}

export default App
