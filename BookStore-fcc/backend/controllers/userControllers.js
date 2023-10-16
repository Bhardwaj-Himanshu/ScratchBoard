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
const postBooksPage = async (req, res) => {
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
const getBooksPage = async (req, res) => {
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

export { getRootPage, postBooksPage, getBooksPage };
