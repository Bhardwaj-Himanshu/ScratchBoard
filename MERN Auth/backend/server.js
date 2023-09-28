// Entry point for our backend server.
// Works in 4 points, imports express, mentions the port, mention the method used express() and at last call various callback functions and routes.
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;
connectDB();
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Setting up routes
app.get('/',(req,res)=>{
    res.send("Server is Ready.")
   })

// defined routes
app.use('/api/users',userRoutes);

// defined middlewares for handling errors
app.use(notFound);
app.use(errorHandler);

//Starting the server
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})