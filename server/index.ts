import express, { Express, Request, Response, Application } from "express";
import {
  getAllTrips,
  createNewTrip,
  getTripById,
  updateTrip,
  deleteTrip,
} from "./trips/db";
import dotenv from "dotenv";
var cors = require("cors");

dotenv.config();

const app: Application = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/trips", async (_req: Request, res: Response) => {
  try {
    const trips = await getAllTrips();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/trips/:tripId", async (req: Request, res: Response) => {
  try {
    const trip = await getTripById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Not found." });
    }
    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/trips", async (req: Request, res: Response) => {
  try {
    const trip = await createNewTrip(req.body);
    res.set("location", `/trips/${trip.tripId}/`).status(201).json(trip);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/trips/:tripId", async (req: Request, res: Response) => {
  try {
    req.body.tripId = req.params.tripId;
    // return res.status(400).json({ message: "Bad Request" });
    const trip = await updateTrip(req.body);
    if (!trip) {
      return res.status(404).json({ message: "Not found." });
    }
    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/trips/:tripId", async (req: Request, res: Response) => {
  try {
    await deleteTrip(req.params.tripId);
    res.status(204).json({});
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
