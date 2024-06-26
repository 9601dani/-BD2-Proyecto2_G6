const express = require('express');
const AuthorController = require('../controllers/authors.controller');

const router = express.Router();
const api = '/api/v1/authors';

router.post(`${api}/add`, AuthorController.addAuthor);
router.get(`${api}/all`, AuthorController.getAll);
router.get(`${api}/active`, AuthorController.getAuthorsActive);
router.get(`${api}/find/:id`, AuthorController.getAuthorById);
router.delete(`${api}/:id`, AuthorController.deleteAuthor);

module.exports = router;
