import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient,   ApolloProvider,  InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allBooks  {
      title,
      author,
      published,
      genres
    }
    allAuthors{
      name
      born
      bookCount
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
)
