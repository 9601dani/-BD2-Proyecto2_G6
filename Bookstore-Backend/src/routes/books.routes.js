const express = require('express')
const BooksController = require('../controllers/books.controller');

const router = express.Router();
const api = '/api/v1/books';

router.get(`${api}/all`, BooksController.getAll);
router.get(`${api}/:id`, BooksController.getBookById);
router.post(`${api}/add`, BooksController.addBook);
router.delete(`${api}/delete/:id`, BooksController.deleteBook);
router.put(`${api}/update/:id`, BooksController.updateBook);
router.get(`${api}/puntuacion/:id`, BooksController.getPuntuacionById);

module.exports = router;
