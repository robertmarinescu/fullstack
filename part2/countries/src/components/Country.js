import React, { useState, useEffect } from "react";
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country}) => {
  
  const [weather, setWeather] = useState([]);

  const weatherHook = () => {
    const capital = country.capital;
    if(capital){
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          console.log("Get data from the sever")
          console.log(response.data)
          setWeather(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(weatherHook, [country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt="" width="200" height="200" />

      <h2>Weather in {country.capital}</h2>
      <h3>Temperature: {weather.current.temperature}</h3>

    </div>
  );
};

export default Country;
