# Trip Planner

## Technologies

This project is based on MERN with TypeScript:

- MongoDB
- ExpressJS
- React
- NodeJS

This project has two dependencies:

- [MongoDB](https://www.mongodb.com/cloud/atlas/register) for the database. You can create an account (free) and get your online database.
- [mapbox](https://www.mapbox.com/) for the map to work. You can create an account (free) and get an access token.

## How to run it

You have to run the frontend and backend services.

Clone this repo.

```console
git clone https://github.com/zuzanakorma/tripplaner.git
```

### Backend

1. Open a terminal

1. Move to directory `server`

   ```console
   cd server
   ```

1. Rename `.env.example` to `.env` and add your MongoDB connection string and database name

   ```console
   mv .env.example .env
   ```

1. Run the commands

   ```console
   npm install && npm run build && npm run dev
   ```

1. Check the backend service is running

   http://localhost:8080/trips

1. Make sure the application keeps running in case you close the terminal

### Frontend

1. Open a new terminal

1. Move to directory `frontend`

   ```console
   cd frontend
   ```

1. Rename `.env.example` to `.env` and add your mapbox token

   ```console
   mv .env.example .env
   ```

1. Run the commands

   ```console
   npm install && npm start
   ```

1. Make sure the application keeps running in case you close the terminal

## How to access the application

In a browser visit:

http://localhost:3000
