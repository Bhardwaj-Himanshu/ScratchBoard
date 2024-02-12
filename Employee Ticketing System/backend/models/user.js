const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // an array of roles as they are employee, managers or Admins
  roles: [
    {
      type: String,
      default: 'Employee',
    },
  ],
  // the status of user on ticket if he/she is still tagged or completing a note
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('User', userSchema);
