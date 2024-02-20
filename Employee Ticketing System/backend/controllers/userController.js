const Note = require('../models/note');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//@desc Get All Users
//@route GET /users
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
  // returns all userData excluding the password
  const users = await User.find().select('-password').lean();
  if (!users?.length) {
    return res.status(400).json({
      message: 'No Users Found!',
    });
  }
  return res.status(200).json(users);
});

//@desc Create New User
//@route POST /users
//@access private

const createNewUser = asyncHandler(async (req, res) => {
  // check if user has send all the details
  const { username, password, roles } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({
      message: 'Please enter all the required fields!',
    });
  }
  // check for duplicates
  const duplicate = await User.findOne({ username: username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({
      message: 'Duplicate username!',
    });
  }

  // hash the password we recieved before storing
  const hashedPwd = await bcrypt.hash(password, 10); // 10 salt rounds

  const userObject = { username, password: hashedPwd, roles };

  // Create and store new User
  const user = await User.create(userObject);

  // send back the new user data if created
  if (user) {
    return res.status(201).json({
      message: `New user ${username} created!`,
    });
  } else {
    return res.status(400).json({
      message: 'Invalid user Data recieved!',
    });
  }
});

//@desc Update a User
//@route PATCH /users
//@access private

const updateUser = asyncHandler(async (req, res) => {
  // get a req.body containing things to be changed--> but everything should be sent again,as things which are not changed should be present as well, cause we rewrite with same info
  const { id, username, roles, active, password } = req.body;
  if (
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    return res.status(400).json({
      message: 'Please Enter all field except password!',
    });
  }
  // does the user exist to update
  const user = await User.findOne({ _id: id });
  //if user does not exist throw an error
  if (!user) {
    return res.status(400).json({
      message: 'User does not exist!',
    });
  }
  //check if the new username provided by user, already exists
  const duplicate = await User.findOne({ username: username }).lean().exec();
  // then check if that duplicate user is trying to make a change or someone else is
  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({
      message: 'Duplicate username, username not avaliable!',
    });
  }
  // updates the entry in database
  user.username = username;
  user.roles = roles;
  user.active = active;

  // check if password is avaliable in the request
  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  return res.status(200).json({ message: `${updatedUser.username} updated` });
});

//@desc Delete a User
//@route DELETE /users
//@access private

const deleteUser = asyncHandler(async (req, res) => {
  // no need to ask for details of other things than id in details
  const { id } = req.body;

  // verify or match the id
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' });
  }

  // Does the user still have assigned notes?
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: 'User has assigned notes' });
  }

  // check if the user we want to delete exists in database--> but this should be true as we will give delete power to only authorised users
  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const deletedUsername = user.username,
    deletedUserID = user._id;

  const result = await user.deleteOne();

  return res.status(200).json({
    message: `Username ${deletedUsername} with ID ${deletedUserID} deleted!`,
  });
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
