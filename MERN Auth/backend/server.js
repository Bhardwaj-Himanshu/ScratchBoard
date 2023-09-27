// Entry point for our backend server.
// Works in 4 points, imports express, mentions the port, mention the method used express() and at last call various callback functions and routes.
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
const app= express();

// defined routes
app.use('/api/users',userRoutes);

//Setting up routes
app.get('/',(req,res)=>{
 res.send("Server is Ready.")
})

// defined middlewares for handling errors
app.use(notFound);
app.use(errorHandler);

//Starting the server
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})