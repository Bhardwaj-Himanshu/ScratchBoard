import express from 'express';
import { getRootPage, postBooksPage } from '../controllers/userControllers.js';
const router = express.Router();

//Root default method for app
router.get('/', getRootPage);
//Post method for books
router.post('/', postBooksPage);

export default router;
