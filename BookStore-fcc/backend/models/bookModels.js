import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  //fields Object
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  // timestamps object
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('RandomData', bookSchema);
