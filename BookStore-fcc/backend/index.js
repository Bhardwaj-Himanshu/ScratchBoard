import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

//Middleware to parse JSON bodies
app.use(express.json());

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
