import express from 'express';
import { PORT, MONGO_DB_URL } from './config.js';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Re-Routing them to different routes
app.use('/', userRoutes);

//setting up a database connection
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log('Connection to database is success.');
    //App/Server listens on a particular port with a log message of--> and we only want our app to run when connection to database is successful
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
