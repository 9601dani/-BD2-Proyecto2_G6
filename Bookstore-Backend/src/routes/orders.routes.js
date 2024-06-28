const express = require('express');
const OrdersController = require('../controllers/sales.controller')

const router = express.Router();
const api = '/api/v1/pedidos';

router.post(`${api}/venta`, OrdersController.createOrder);
router.get(`${api}/getTodosPedidos`, OrdersController.getOrders);
router.get(`${api}/getPedidosById/:id_pedido`, OrdersController.getOrderById);
router.put(`${api}/updatePedidoById/:id_pedido`, OrdersController.updateOrderById);
router.get(`${api}/getPedidosUsuario/:id_usuario`, OrdersController.getOrdersByUser);
router.get(`${api}/getPedidosByState/:estado`, OrdersController.getOrdersByStatus);


module.exports = router;
