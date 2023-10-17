import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

//Encapsulating methods to hide some basic setup like setting up SERVERS,and configuring .ENV
const app = express();
dotenv.config();

//Middleware to parse JSON bodies
app.use(express.json());

//Middleware to handle CORS policies
// 1st Method allows everyone
app.use(cors());
// 2nd Method allows more control
// app.use(
//   cors({
//     origin: 'http://localhost:5000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// Re-Routing them to different routes
app.use('/', userRoutes);

//setting up a database connection
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Connection to database is success.');
    //App/Server listens on a particular port with a log message of--> and we only want our app to run when connection to database is successful
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
