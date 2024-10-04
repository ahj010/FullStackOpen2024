import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
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

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born ){
    name
    born
  }
}
`
