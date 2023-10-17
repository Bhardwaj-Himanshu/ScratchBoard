import express from 'express';
import {
  getRootPage,
  getAllBooks,
  getBookById,
  addNewBook,
  getBookByIdAndUpdateIt,
  deleteBook,
} from '../controllers/userControllers.js';
const router = express.Router();

//Root default method for app
router.get('/', getRootPage);

//Post method for books
router.post('/books', addNewBook);

//Get method for books-->to get all books
router.get('/books', getAllBooks);

//Get a book by ID
router.get('/books/:id', getBookById);

//Get a book by ID and UPDATE it
router.put('/books/:id', getBookByIdAndUpdateIt);

//Get a book by Id and DELETE it
router.delete('/books/:id', deleteBook);

export default router;
