const express = require('express');
const User = require('../models/Users');
const UserController = require('../controllers/users.controller');

const router = express.Router();
const api = '/api/v1/users';

router.get(api, UserController.getAllUsers);
router.post(`${api}/register`, UserController.createUser);
router.put(`${api}/:id`, UserController.updateUser);
router.get(`${api}/orders/:status`, UserController.getOrders);
router.put(`${api}/status/:id`, UserController.changeStatus);
router.get(`${api}/top`, UserController.topBooks);
router.post(`${api}/login`, UserController.login);


module.exports = router;
