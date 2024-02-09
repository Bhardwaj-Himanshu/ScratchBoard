import express from 'express';
import dotenv from 'dotenv';

//Initilising .env to give out a object using config method and rendering our app using express() method and setting up the port
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Single router for now for '/'
app.get('/', (req, res) =>
  res.send('You sended a GET request to localhost:5000/')
);

//Our landing page welcome message from server
app.listen(port, () => console.log(`Server started on port ${port}`));
