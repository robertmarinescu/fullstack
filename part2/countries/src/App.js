import React, {useState, useEffect} from "react";
import axios from 'axios';
import Country from "./components/Country"

const TooManyMatches = () => <p>Too many matches, specify another filter</p>
const NoCountrySelected = () => <p>No country selected</p>
const NoCountriesMatched = () => <p>No countries matched</p>

const CountryItem = ({countryName, onClick}) => <p>{countryName.name} <button onClick={onClick}>show</button></p>

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setCountry] = useState("");
  const [showCountry, setShowCountry] = useState([]);

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
    setShowCountry([])
    setCountry(target.value)
  }

  let filterCountries = countries.filter(country => country.name.toLowerCase().includes(newCountry.toLowerCase()))


  function displayOneCountry(country){
    return <Country key={country.name} country={country}/>
  }

  function displayMultipleCountries(){
    if(showCountry.length === 1){
      return <Country key={showCountry.name} country={showCountry[0]}/>
    }
    return filterCountries.map(country => {
      return <CountryItem key={country.name} countryName={country} onClick={()=>displayCurrentCountryTest(country)}></CountryItem>
    })
  }

  function displayCurrentCountryTest(country){
    setShowCountry([])
    setShowCountry(showCountry.concat(country))
  }

  return (
    <div>
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
              ? displayMultipleCountries()
              : <TooManyMatches/>
          : <NoCountriesMatched/>
        : <NoCountrySelected/>
      } 

    </div>
  )
}

export default App;
