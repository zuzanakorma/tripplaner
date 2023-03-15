import './App.css';
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios';
import api from './api/api'
import Gallery from './components/gallery/Gallery';
import AddForm from './components/addForm/AddForm';
import MyMap from './components/map/MyMap'
import {Trip} from './types'

type AppProps = {
  trips: Trip[],
  activeTrip: string,
  onChangeSelectHandler: Function,
  onSubmitHandler: Function
}

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);

  const getTrips = async () => {
    try{
      const response = await api.get("/trips")
      console.log(response.data)
      setTrips(response.data);
      // setActiveBootcamp(response.data.bootcamps[0].id);
    }catch(error: unknown){
      if (error instanceof AxiosError) {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    getTrips();
  }, []);
  return (
  
    <div className="App">
      <section>
     <h1>Trip Planner</h1>
     <AddForm onSubmitHandler={(trip: Trip) => setTrips([...trips, trip])}/>
     </section>
     <section>
     <h2>My Trips</h2>
     <div className='allTrips'>
     {trips.map((trip:Trip)=>
     <Gallery key={trip.tripId} trip={trip} onSubmitHandler={(id: string) => setTrips(
      trips.filter(trip =>
        trip.tripId !== id))}/>
     )}
     </div>
     </section>
     <section>
     <MyMap trips={trips}/>
     </section>
    </div>
  
  );
}


export default App;