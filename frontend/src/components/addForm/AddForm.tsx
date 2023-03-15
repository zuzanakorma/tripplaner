import React, { SelectHTMLAttributes } from 'react'
import { useState, useEffect } from 'react'
import './addform.css';
import { AxiosError } from 'axios';
import api from '../../api/api'
import Countries, {ListCountries, CitiesOfCountry} from '../countries/Countries';
import {Trip} from '../../types' 



type AppProps = {
  // trips: TripObject[],
  // activeTrip: string,
  onSubmitHandler: Function
}

export default function AddForm(props: AppProps) {
    const [title, setTitle] = useState('')
    const [country, setCountry] = useState('AF')
    const [city, setCity] = useState('')
    const [coordinates, setCoordinates] = useState('')
    const [validInput, setValidInput] = useState('')

    // useEffect(() => {
    //   console.log('use effect triggered')
    //   setTitle(title)
    // }, [title]
    // )

    const onChangeHandlerTripTitleInput=(event: React.FormEvent<HTMLInputElement>)=>{
      setTitle(event.currentTarget.value)
    }
    const onChangeHandlerCountryInput=(event: React.FormEvent<HTMLSelectElement>)=>{
      setCountry(event.currentTarget.value)
    }

    const onChangeHandlerCityInput=(event: React.FormEvent<HTMLSelectElement>)=>{
      setCity(event.currentTarget.value)
    }
    async function onClear (e: any) {
      e.preventDefault();
      if (title === '' ) {
        setValidInput('error') 
        return
      }
  
      const place = JSON.parse(city)

      const tripData:Trip ={
        title: title,
        country: country,
        city: place.city,
        latitude: place.latitude,
        longitude: place.longitude,
      }
      try{
        const response = await api.post("/trips", tripData)
        setTitle('')
        setCountry('')
        setCity('')
        e.target.reset()
        props.onSubmitHandler(response.data)
      }catch(error: unknown){
        if (error instanceof AxiosError) {
          console.log(error.message)
        }
      }
    }

    // not implemented
    const onSubmitHandler = async (event: React.FormEvent)=>{
     event.preventDefault();
      if (title === '' ) {
        setValidInput('error') 
        return
      }
  
      const place = JSON.parse(city)

      const tripData:Trip ={
        title: title,
        country: country,
        city: place.city,
        latitude: place.latitude,
        longitude: place.longitude,
      }
      try{
        const response = await api.post("/trips", tripData)
        props.onSubmitHandler(response.data)
      }catch(error: unknown){
        if (error instanceof AxiosError) {
          console.log(error.message)
        }
      }
    }
   
  return (
<section>
<form id='addTripForm'  onSubmit={onClear} >
    <h3 className='title'>Plan new Trip</h3>
    <label >Title</label>
    <input className="addTripTitleInput" onChange={onChangeHandlerTripTitleInput} type="text" id="triptitle" name="triptitle" placeholder="family holidays, business trip, weekend getaway..." />

    <label >Select Country</label>
    <select id="countries" name="countries" onChange={onChangeHandlerCountryInput}>
      <ListCountries />
    </select>
    <label >Select City</label>
    <select className='' id="cities" name="cities" onChange={onChangeHandlerCityInput}>
      <CitiesOfCountry country={country}/>
    </select>
 

    {/* <label>Start Date</label> */}
    {/* <input className="dateInput" onChange={onChangeHandler} type="Date" /> */}
    {/* <label>End Date</label> */}
    {/* <input className="dateInput" onChange={onChangeHandler} type="Date" /> */}
  
    {/* <label>Budget</label> */}
    {/* <input className="addBudgetInput" onChange={onChangeHandler} type="number" min={0} id="budget" name="budget" /> */}
    {/* <label>Total Cost</label> */}
    {/* <input className="addCostInput" onChange={onChangeHandler} type="number" min={0} id="cost" name="cost"/> */}
    {validInput !== '' && 
    <>
    <p className='errorMessage'>Trip title is required.</p>
    </>}
    <button id='addTripBtn' className='addTripBtn' type="submit">Add Trip</button>
</form>
</section>
  )
}
