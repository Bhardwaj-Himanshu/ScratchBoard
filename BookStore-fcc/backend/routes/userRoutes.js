import express from 'express';
import {
  getRootPage,
  postBooksPage,
  getBooksPage,
} from '../controllers/userControllers.js';
const router = express.Router();

//Root default method for app
router.get('/', getRootPage);
//Post method for books
router.post('/books', postBooksPage);
//Get method for books-->to get all books
router.get('/books', getBooksPage);

export default router;
