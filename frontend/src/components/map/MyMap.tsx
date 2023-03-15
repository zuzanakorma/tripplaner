import React from 'react'
import mapboxgl from 'react-map-gl';
import Map, { Marker } from 'react-map-gl';
import './mymap.css'
import {Trip} from '../../types'
import Pin from './pin';

type AppProps = {
  trips: Trip[],
}

export default function MyMap(props: AppProps) {
  return (
    <>
    <Map 
    initialViewState={{
     longitude: 0,
     latitude: 30,
     zoom: 0.5
   }}
   
   id="map"
   mapStyle="mapbox://styles/mapbox/light-v10"
   mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
   style={{width: 600, height: 400}}
  >
    {props.trips.map((trip: Trip)=> 
  <Marker key={trip.tripId} longitude={trip.longitude} latitude={trip.latitude} anchor="bottom" >
<Pin />
  </Marker>
    )}
    </Map>
    
  </>
    
  )
}
