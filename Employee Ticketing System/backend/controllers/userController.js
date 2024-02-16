const Note = require('../models/note');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//@desc Get All Users
//@route GET /users
//@access private

const getAllUsers = asyncHandler(async (req, res) => {
  // returns all userData excluding the password
  const users = User.find().select('-password').lean();
  if (!users) {
    res.status(400).json({
      message: 'No Users Found!',
    });
  }
  res.status(200).json(users);
});

//@desc Create New User
//@route POST /users
//@access private

const createNewUser = asyncHandler(async (req, res) => {
  // check if user has send all the details
  const { username, password, roles } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    res.status(400).json({
      message: 'Please enter all the required fields!',
    });
  }
  // check for duplicates
  // const duplicate = User.findOne({ username }).lean().exec();

  // if (duplicate) {
  //   res.status(409).send({
  //     message: 'Duplicate username!',
  //   });
  // }

  // hash the password we recieved before storing
  const hashedPwd = await bcrypt.hash(password, 10); // 10 salt rounds

  const userObject = { username, password: hashedPwd, roles };

  // Create and store new User
  const user = await User.create(userObject);

  // send back the new user data if created
  if (user) {
    res.status(201).json({
      message: `New user ${username} created!`,
    });
  } else {
    res.status(400).json({
      message: 'Invalid user Data recieved!',
    });
  }
});

//@desc Update a User
//@route PATCH /users
//@access private

const updateUser = asyncHandler(async (req, res, next) => {
  next();
});

//@desc Delete a User
//@route DELETE /users
//@access private

const deleteUser = asyncHandler(async (req, res, next) => {
  next();
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
