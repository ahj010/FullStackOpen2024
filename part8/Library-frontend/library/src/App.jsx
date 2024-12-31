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
import { Button } from "./components/ui/button";

const App = () => {
  const [bookDisplay, setBookDisplay] = useState(false)
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
    } else if(!savedToken){
      setToken(null);
    }
  },[]);

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
        <LoginForm
          setToken={setToken}
          setErrorMessage={notify}
        />
      </div>
    )
  }


  return (
<div className="bg-lime-100 w-full min-h-screen">
  <nav className="bg-blue-300 text-white p-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
      <Button
        onClick={() => {
          setBookDisplay(true);
          setBookFormDisplay(false);
          setAuthorDisplay(false);
          setRecommended(false);
        }}
        className={`px-4 py-2 rounded-md min-w-[100px] ml-0 sm:ml-0 ${
          bookDisplay ? 'bg-blue-500' : 'bg-amber-400 hover:bg-blue-400'
        }`}
      >
        Books
      </Button>
      <Button
        onClick={() => {
          setBookDisplay(false);
          setBookFormDisplay(true);
          setAuthorDisplay(false);
          setRecommended(false);
        }}
        className={`px-4 py-2 rounded-md min-w-[100px] ml-16 sm:ml-0 ${
          bookFormDisplay ? 'bg-blue-500' : 'bg-amber-400 hover:bg-blue-400'
        }`}
      >
        New Book
      </Button>
      <Button
        onClick={() => {
          setBookDisplay(false);
          setBookFormDisplay(false);
          setAuthorDisplay(true);
          setRecommended(false);
        }}
        className={`px-4 py-2 rounded-md min-w-[100px] ml-28 sm:ml-0 ${
          authorDisplay ? 'bg-blue-500' : 'bg-amber-400 hover:bg-blue-400'
        }`}
      >
        Authors
      </Button>
      <Button
        onClick={() => {
          setBookDisplay(false);
          setBookFormDisplay(false);
          setAuthorDisplay(false);
          setRecommended(true);
        }}
        className={`px-4 py-2 rounded-md min-w-[100px] ml-40 sm:ml-0 ${
          recommended ? 'bg-blue-500' : 'bg-amber-400 hover:bg-blue-400'
        }`}
      >
        Recommended
      </Button>
      {token && (
        <Button
          onClick={logout}
          className="px-4 py-2 rounded-md min-w-[100px] ml-64 sm:ml-auto bg-amber-400 hover:bg-red-600"
        >
          Logout
        </Button>
      )}
    </div>
  </nav>

  <div className="p-4">
    {errorMessage && <Notify errorMessage={errorMessage} />}
    {bookFormDisplay && <NewBook setErrorMessage={notify} />}
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
</div>

);
}

export default App
