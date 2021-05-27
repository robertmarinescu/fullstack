
export default function Weather ({country, weather}) {
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>Temperature:</b> {weather?.current?.temperature} Celcius</p>
      <img src={weather?.current?.weather_icons[0]} alt=""/>
      <p><b>wind:</b> {weather?.current?.wind_speed} mph direction {weather?.current?.wind_dir}</p>
    </div>
  )
}

