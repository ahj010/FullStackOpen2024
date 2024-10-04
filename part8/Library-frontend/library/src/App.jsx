import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_AUTHORS } from "./queries/queries"
import UpdateAuthor from "./components/UpdateAuthor";


const App = () => {
  const [page, setPage] = useState("authors");

  const resultBooks = useQuery(ALL_BOOKS)
  const resultAuthors = useQuery(ALL_AUTHORS)

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>Loading...</div>;
  }

  if (resultBooks.error) {
    return <div>Error loading books: {resultBooks.error.message}</div>;
  }

  if (resultAuthors.error) {
    return <div>Error loading authors: {resultAuthors.error.message}</div>;
  }

  // console.log('AUTHORS:', resultAuthors.data);
  // console.log('BOOKS:', resultBooks.data);

  const books = resultBooks.data.allBooks || []
  const authors = resultAuthors.data.allAuthors || []



  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("update")}>update author</button>
      </div>

      <Authors show={page === "authors"} authors={authors}/>

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} />

      <UpdateAuthor show={page === "update"} authors={authors}/>
    </div>
  );
};

export default App;
