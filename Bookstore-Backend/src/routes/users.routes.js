const express = require('express');
const User = require('../models/Users');
const UserController = require('../controllers/usersController');

const router = express.Router();
const api = '/api/v1/users';

router.get(api, UserController.getAllUsers);
router.post(api, UserController.createUser);
router.put(`${api}/:id`, UserController.updateUser);
router.get(`${api}/orders/:status`, UserController.getOrders);
router.put(`${api}/status/:id`, UserController.changeStatus);
router.get(`${api}/top`, UserController.topBooks);







module.exports = router;