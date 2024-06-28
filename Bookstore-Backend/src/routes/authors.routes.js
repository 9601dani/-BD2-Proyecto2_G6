const express = require('express');
const AuthorsController = require('../controllers/authors.controller');

const router = express.Router();
const api = '/api/v1/authors';

router.post(`${api}/add`, AuthorsController.addAuthor);
router.get(`${api}/all`, AuthorsController.getAll);
router.get(`${api}/active`, AuthorsController.getAuthorsActive);
router.get(`${api}/find/:id`, AuthorsController.getAuthorById);
router.delete(`${api}/delete/:id`, AuthorsController.deleteAuthor);
router.put(`${api}/update/:id`, AuthorsController.updateAuthor);
router.get(`${api}/name/:name`, AuthorsController.getAuthorByName);

module.exports = router;
