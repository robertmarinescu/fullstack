import React, {useState, useEffect} from "react";
import axios from 'axios';
import Country from "./components/Country"

const TooManyMatches = () => <p>Too many matches, specify another filter</p>
const NoCountrySelected = () => <p>No country selected</p>
const NoCountriesMatched = () => <p>No countries matched</p>

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setCountry] = useState("");

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("Promise fulfilled")
        console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleCountryChange = (event) => {
    const target = event.target
    setCountry(target.value)
  }

  const filterCountries = countries.filter(country => country.name.toLowerCase().includes(newCountry.toLowerCase()))

  function displayOneCountry(country){
    return <Country key={country.name} country={country}/>
  }

  return (
    <div>
      <h1>Hello world</h1>
      <form>
        <div>
          find countries <input value={newCountry} onChange={handleCountryChange}/>
        </div>
      </form>
      
      { newCountry
        ? filterCountries.length > 0
          ? filterCountries.length === 1
            ? filterCountries.map(country => displayOneCountry(country))
            : filterCountries.length <= 10
              ? filterCountries.map(country => {
                return <p key={country.name}>{country.name}</p>
              })
              : <TooManyMatches/>
          : <NoCountriesMatched/>
        : <NoCountrySelected/>
      }
      
    </div>
  )
}

export default App;
