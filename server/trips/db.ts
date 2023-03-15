import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { Trip } from "../types";

async function connDB(): Promise<MongoClient> {
  dotenv.config();

  //   const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  const uri = `${process.env.DB_CONN_STRING}`;

  const client: MongoClient = new MongoClient(uri);

  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
  return client;
}

const generateTripId = () => uuidv4();

const getAllTrips = async (): Promise<Trip[]> => {
  const client = await connDB();
  const results = await client
    .db(process.env.MONGO_DATABASE)
    .collection<Trip>("trips")
    .find({})
    .project<Trip>({ _id: 0 })
    .limit(50)
    .toArray();
  client.close();
  return results;
};

const createNewTrip = async (trip: Trip): Promise<Trip> => {
  const newTrip: Trip = {
    tripId: generateTripId(),
    title: trip.title,
    budget: trip.budget || 0,
    dateFrom: trip.dateFrom,
    dateTo: trip.dateTo,
    totalCost: trip.totalCost || 0,
    country: trip.country,
    city: trip.city,
    latitude: trip.latitude,
    longitude: trip.longitude,
    description: trip.description,
  };
  const client = await connDB();
  const result = await client
    .db(process.env.MONGO_DATABASE)
    .collection("trips")
    .insertOne(newTrip);
  client.close();
  return newTrip;
};

const getTripById = async (id: Trip["tripId"]): Promise<Trip | null> => {
  const client = await connDB();
  const result = await client
    .db(process.env.MONGO_DATABASE)
    .collection<Trip>("trips")
    .find({ tripId: id })
    .project<Trip>({ _id: 0 })
    .toArray();
  client.close();
  if (result) {
    return result[0];
  }
  return null;
};

const updateTrip = async (trip: Trip): Promise<Trip> => {
  const client = await connDB();
  const result = await client
    .db(process.env.MONGO_DATABASE)
    .collection("trips")
    .updateOne(
      { tripId: trip.tripId },
      {
        $set: {
          title: trip.title,
          budget: trip.budget,
          dateFrom: trip.dateFrom,
          dateTo: trip.dateTo,
          totalCost: trip.totalCost,
          description: trip.description,
        },
      }
    );
  client.close();
  // needs to return the right updated trip
  return trip;
};

const deleteTrip = async (tripId: Trip["tripId"]) => {
  const client = await connDB();
  const result = await client
    .db(process.env.MONGO_DATABASE)
    .collection("trips")
    .deleteOne({ tripId });
  client.close();
  return result;
};

export { getAllTrips, createNewTrip, getTripById, updateTrip, deleteTrip };
