import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import CountryDetails from "./components/CountryDetails"
import CountryItem from "./components/CountryItem"

const TooManyMatches = () => <p>Too many matches, specify another filter</p>
const NoCountrySelected = () => <p>No country selected</p>
const NoCountriesMatched = () => <p>No countries matched</p>

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setCountry] = useState("");
  const [showCountry, setShowCountry] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("Promise fulfilled")
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  

  //TODO: useCallback to wrap handleCountryChange
  const handleCountryChange = useCallback((event) => {
    const target = event.target
    setShowCountry([])
    setCountry(target.value)
  }, [])
  

  let filterCountries = countries.filter(country => country.name.toLowerCase().includes(newCountry.toLowerCase()))


  function displayOneCountry(country){
    console.log("Display weather details: ")
    return <CountryDetails key={country.name} country={country} />
  }

  function displayMultipleCountries(){
    if(showCountry.length === 1){
      return <CountryDetails key={showCountry.name} country={showCountry[0]} />
    }
    return filterCountries.map(country => {
      return <CountryItem key={country.name} countryName={country} onClick={()=>displayCurrentCountryTest(country)}></CountryItem>
    })
  }

  function displayCurrentCountryTest(country){
    setShowCountry([country])
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
            : (filterCountries.length <= 10 
              ? displayMultipleCountries()
              : <TooManyMatches/>)
          : <NoCountriesMatched/>
        : <NoCountrySelected/>
      } 
    </div>
  )
}

export default App;
