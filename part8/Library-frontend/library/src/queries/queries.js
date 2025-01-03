import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {
    name
  }
  published
  genres
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }

}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author{
      name
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born ){
    name
    born
  }
}`

export const LOGIN =  gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const USER =  gql`
query {
  me {
    username
    favoriteGenre
  }
}

`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
