const User = require('../models/Users');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (users==null || users.length==0 || !users) {
        res.status(404).json({message: 'Users not found'});
        return;
    }
    res.json(users);
}

const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body , {new: true});
    res.json(user);
}

/*
* Methods for admin:
*/

const getOrders = async (req, res) => {
    const orders_users = await User.find({status: req.params.status});
    if (orders_users==null || orders_users.length==0 || !orders_users) {
        res.status(404).json({message: 'Orders not found'});
        return;
    }
    res.json(orders_users);
}

const changeStatus = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate (id, req.body , {new: true});
    res.json(user);
}

const topBooks = async (req, res) => {
    const books = await User.find().sort({books_sold: -1}).limit(15);
    if (books==null || books.length==0 || !books) {
        res.status(404).json({message: 'Books not found'});
        return;
    }
    res.json(books);
}




module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    changeStatus,
    topBooks,
    getOrders
};