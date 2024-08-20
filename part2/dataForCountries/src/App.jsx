import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

function App () {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => setCountries(res.data))
  }, [])

const searchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (

      <div>
     Find countries: <input value={search} onChange={(e) => setSearch(e.target.value) }/>
     <CountryDisplay searchedCountries={searchedCountries} setSearch={setSearch}/>
      </div>
  )
}

export default App
