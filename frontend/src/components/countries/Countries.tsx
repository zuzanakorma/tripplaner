import { Country, City, ICity }  from 'country-state-city';


export function ListCountries(){
return(
  <>
  {Country.getAllCountries().map((country)=>
  <option className='optionSelect' key={country.isoCode} value={country.isoCode}>{country.name}</option>
  )}
  </>)
}
export function CitiesOfCountry(props: any){
  let cities = City.getCitiesOfCountry(props.country)

  if (!cities) {
    cities = []
  }

function GetCoordinates(location:ICity){
  const {latitude,longitude,countryCode,name} = location
  const place = {
    city: name,
    latitude: latitude,
    longitude: longitude
  }
  if (!latitude && !longitude) {
    const country = Country.getCountryByCode(countryCode)
    return `${name},${country?.latitude},${country?.longitude}`
  }
  return JSON.stringify(place)
}

return(
  <>
  {cities.map((city, index)=>
  <option className='optionSelect' key={index} value={GetCoordinates(city)}>{city.name}</option>
  )}
  </>)
}



export default {ListCountries, CitiesOfCountry}