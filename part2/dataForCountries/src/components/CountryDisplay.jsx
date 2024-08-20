import PropTypes from 'prop-types'
import WeatherDisplay from './WeatherDisplay';


const CountryDisplay = ({ searchedCountries, setSearch }) => {
    if (searchedCountries.length === 1) {
        const country = searchedCountries[0];

        return (
            <>
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital: {country.capital}</div>
                <div>Population: {country.population}</div>
                <h2>Languages:</h2>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={country.ccn3}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={country.name.common} width="20%" />
            </div>
            <WeatherDisplay country={country}/>
            </>
        );
    }

    if (searchedCountries.length > 10) {
        return <div>Too many matches, specify another filter.</div>;
    }

    return searchedCountries.map(country => (
        <div key={country.cca3}>
            {country.name.common}
            <button value={country.name.common} onClick={(e) => setSearch(e.target.value)}>Show</button>
        </div>
    ));


  };

  CountryDisplay.propTypes ={
    searchedCountries: PropTypes.array.isRequired,
    setSearch: PropTypes.func.isRequired,
  }

  export default CountryDisplay
