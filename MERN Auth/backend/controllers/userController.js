import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';

// DESC - Register a User
// ROUTE -  POST /api/users
// ACCESS - public --which means anyone can access, you don't need to be logged in to access this page.

const registerUser = asyncHandler(async (req,res)=>{
    // takes in response body object
    const {name,email,password} = req.body;
    
    const userExists = await User.findOne({email: email})
     
    //checks if user already exists or not; throws a error if it does
    if(userExists){
        res.status(400);
        throw new Error('User already exists.');
    }
    
    //creates a new user
    const user= await User.create({
    name,
    email,
    password
    })

    // if user was created succesfully sends back a 201
    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    // else an error regarding unsuccessful creation of user.
    else{
        res.status(404);
        throw new Error("User was not created.")
    }
    // res.status(200).json({
    //     message:"Registration Page."
    // })
});

// DESC - Auth User/set token/Login
// ROUTE - POST api/users/auth
// ACCESS - public --which means anyone can access, you don't need to be logged in to access this page.

const authUser = asyncHandler(async (req,res)=>{
    // looks for email,password inside the req.body
    const { email,password } = req.body;
    //checks if it can find the user with same email
    const user = await User.findOne({email: email});
    //checks for password as well, if it does sends back a 200 and a token
    if(user && (await user.matchPasswords(password))){
        generateToken(res, user._id)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }
    // else throws an error regarding invalid credentials
    else{
        res.status(401);
        throw new Error("Invalid Email or Password.")
    }

});

// DESC -  Logout user and clear cookie
// ROUTE - POST /api/users/logout
// ACCESS - private --which means you need to be logged in to access this page.

const logoutUser = asyncHandler(async (req,res)=>{
    //deletes the cookie
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    // sends a response
    res.status(200).json({
        message:"User Logged Out."
    })
});

// DESC -  Show user profile
// ROUTE - GET /api/users/profile
// ACCESS - private --which means you need to be logged in to access this page.

const showProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"Show User Profile."
    })
});

// DESC -  Update user profile
// ROUTE - POST /api/users/profile
// ACCESS - private --which means you need to be logged in to access this page.

const updateUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"Update User Profile."
    })
});

export {
    registerUser,
    authUser,
    logoutUser,
    showProfile,
    updateUserProfile
};