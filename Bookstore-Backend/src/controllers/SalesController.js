const Orders = require('../models/Orders')

const createOrder = async (req, res) => {
    try {
        
        
        res.status(201).json({ message: "Pedido realizado con éxito" });

    } catch (error) {
        
        res.status(400).json({ message: 'Error creating order', error: error.message });

    }
};

async function updateStock(books) {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

async function updateSalesCustomer(customer) {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error getting orders', error: error.message });
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error getting order', error: error.message });
    }
}


const updateOrder = async (req, res) => {
    try {
        await Orders.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Order updated successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating order', error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting order', error: error.message });
    }
}

const getOrdersByDate = async (req, res) => {
    try {
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error getting orders', error: error.message });
    }
}

const getMostSoldBooks = async (req, res) => {
    try {
        
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: 'Error getting most sold books', error: error.message });
    }
}

const getMostSoldAuthors = async (req, res) => {
    try {
        
        res.status(200).json(authors);
    } catch (error) {
        res.status(400).json({ message: 'Error getting most sold authors', error: error.message });
    }
}

const getMostSoldCategories = async (req, res) => {
    try {
        
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: 'Error getting most sold categories', error: error.message });
    }
}


const getMostSoldCustomers = async (req, res) => {
    try {
        
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: 'Error getting most sold customers', error: error.message });
    }
}



module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrdersByDate,
    getMostSoldBooks,
    getMostSoldAuthors,
    getMostSoldCategories,
    getMostSoldCustomers
}