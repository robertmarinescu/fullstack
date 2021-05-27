
const CountryItem = ({countryName, onClick}) => {
    return <p>{countryName.name} <button onClick={onClick}>show</button></p>
}

export default CountryItem;