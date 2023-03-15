import Card from '../card/Card'
import './gallery.css'
import { useState } from 'react';
import api from '../../api/api'
import { AxiosError } from 'axios';
import { Trip } from '../../types'

type AppProps = {
  trip: Trip, 
  onSubmitHandler: Function
}
export default function Gallery(props: AppProps) {
  const [switchToggled, setSwitchToggled] = useState(false)

  const ToggleSwitch=()=>{
    switchToggled ? setSwitchToggled(false): setSwitchToggled(true)
  }

  const deleteTrip = async (id:any) => {
    try{
      const response = await api.delete(`/trips/${id}`)
      props.onSubmitHandler(id)
    }catch(error: unknown){
      if (error instanceof AxiosError) {
        console.log(error.message)
      }
    }
  }

  return (
    <>
      <div id={props.trip.tripId} key={props.trip.tripId}>
        <div onClick={ToggleSwitch} className={switchToggled ? 'cartDiv toggled' : 'cartDiv' }>
      <h3 className='cartText'>{props.trip.title.charAt(0).toUpperCase() + props.trip.title.slice(1)}</h3>
      <h3 className='cartText'>{props.trip.country}</h3>
      <h2 >{props.trip.city}</h2>
      <p>Date: {props.trip.dateFrom?.toLocaleDateString()} - {props.trip.dateFrom?.toLocaleDateString()}</p>
      {/* <p>Description: </p>
      <p>Budget: {props.trip.budget}</p> */}
        
      <p >
      <button className={switchToggled ? 'deleteBtn' : 'hideBtn'} type="submit" >Update</button>
      <button className={switchToggled ? 'deleteBtn' : 'hideBtn'} type="submit" onClick={() => deleteTrip(props.trip.tripId)}>Delete</button>
      </p>
        </div>
    </div>

    </>
  )
}
