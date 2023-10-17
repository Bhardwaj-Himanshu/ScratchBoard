import { Book } from '../models/bookModels.js';

// What functions are called when particular routes are called.

//Controller function for the root page
const getRootPage = (req, res) => {
  try {
    res.status(200).send('GET Request to /');
    console.log('GET Request to /');
  } catch (error) {
    console.log(error);
  }
};

//Controller function to create a new book
const addNewBook = async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      console.log('if block');
      return res.status(400).send({
        message: 'Send all the required fields:title,author,publishYear',
      });
    } else {
      console.log('else block');

      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const kitten = await Book.create(newBook);
      return res.status(201).send(kitten);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occured.' });
  }
};

//Controller function for getting info about all books
const getAllBooks = async (req, res) => {
  try {
    const kittens = await Book.find({});

    return res.status(202).send({
      count: kittens.length,
      data: kittens,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error at GET req for /books');
  }
};

//Controller function to get one book from database by id
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const kitten = await Book.findById(id);

    return res.status(203).send({
      kitten,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send('Could not find book with specified ID.');
  }
};

//Controller function to get book by ID and update it
const getBookByIdAndUpdateIt = async (req, res) => {
  try {
    //First we check if all the fields to be updated are avliable or not
    if (
      !req.body ||
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      res.status(400).send('Send all the required fields.');
    } else {
      //We find the specified book by id and update it
      const { id } = req.params;

      const kittenUpdated = await Book.findByIdAndUpdate(id, req.body);

      if (!kittenUpdated) {
        res.status(404).send('Book with provided id not found.');
      }

      res.status(203).send('Book successfully Updated.');
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

//Controller Function to get a book by ID and DELETE it.
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedKitten = await Book.findByIdAndDelete(id);

    if (!deletedKitten) {
      res.status(404).send('Book with provided id not found.');
    }

    res.status(200).send('Book successfully deleted.');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
  getRootPage,
  addNewBook,
  getAllBooks,
  getBookById,
  getBookByIdAndUpdateIt,
  deleteBook,
};
