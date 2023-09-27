import asyncHandler from 'express-async-handler'

// DESC - Register a User
// ROUTE -  POST /api/users
// ACCESS - public --which means anyone can access, you don't need to be logged in to access this page.

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"Registration Page."
    })
});

// DESC - Auth User/set token/Login
// ROUTE - POST api/users/auth
// ACCESS - public --which means anyone can access, you don't need to be logged in to access this page.

const authUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"Auth User."
    })
});

// DESC -  Logout user and clear cookie
// ROUTE - POST /api/users/logout
// ACCESS - private --which means you need to be logged in to access this page.

const logoutUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"Logout User."
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