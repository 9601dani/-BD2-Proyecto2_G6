const express = require('express');
const OrdersController = require('../controllers/SalesController')

const router = express.Router();

router.post('/create-order', OrdersController.createOrder);


module.exports = router;