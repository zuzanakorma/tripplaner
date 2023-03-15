import {Trip}  from '../../types'


type AppProps = {
  trip: Trip, 
}

export default function Card(props: AppProps) {
  return (
    <section>
    <div>Trip Details</div>
      <h1>{props.trip.title}</h1>
      <p>{props.trip.totalCost}</p>
      
    </section>

    
  )
}
