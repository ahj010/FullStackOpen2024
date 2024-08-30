import axios from "axios"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types'

const WeatherDisplay = ({country}) => {
    const [weather, setWeather ] = useState({})
    useEffect(() => {
      const api_key = import.meta.env.VITE_API_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`)
        .then((res) =>   {
          // console.log(res.data)
          setWeather(res.data)})
    }, [country])

    return (
      <>
      <h1>Weather in {country.name.common}</h1>
      <div>
      <b>Temperature:</b> {`${weather.main?.temp}`} Celcius
      <img alt={`${weather.weather?.[0].description}`}src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} />
      </div>
      <b>Wind:</b> {`${weather.wind?.speed}`} m/s
      </>
    )
}

WeatherDisplay.propTypes ={
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  }
export default WeatherDisplay
