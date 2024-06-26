const express = require('express');
const OrdersController = require('../controllers/SalesController')

const router = express.Router();

router.post('/venta', OrdersController.createOrder);
router.get('/getTodosPedidos', OrdersController.getOrders);
router.get('/getPedidosById/:id_pedido', OrdersController.getOrderById);
router.put('/updatePedidoById/:id_pedido', OrdersController.updateOrderById);
router.get('/getPedidosUsuario/:id_usuario', OrdersController.getOrdersByUser);



module.exports = router;