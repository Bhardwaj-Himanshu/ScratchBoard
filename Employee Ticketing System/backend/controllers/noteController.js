const asyncHandler = require('express-async-handler');
const Note = require('../models/note');
// User is required as we need to remember which user is making,updating or deleting the note also who is assigned
// I am not thinking of importing bcrypt as no password would be sent in my opinion

//@desc Get All Notes
//@route GET /notes
//@access private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res.status(400).json({
      message: 'No notes found or have not been created!',
    });
  }
  return res.status(200).json(notes);
});

//@desc Create New Note
//@route PUT /notes
//@access private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // first try at doing it without throwing in the User object
  if (!user || !title || !text) {
    return res.status(400).json({
      message: 'Please send all the required fields!',
    });
  }
  // If that person has everything sent
  // I don't think so we'll check for duplicates in this one
  const noteObject = { user, title, text };
  const newNote = await Note.create(noteObject);

  return res.status(201).json({
    message: `A new Note titled ${title} by user named ${user} got created.`,
  });
});

module.exports = { getAllNotes, createNewNote };
