const User = require('../models/Users');

const getAllUsers = async (req, res) => {
    const users = await User.find();
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
    const users = await User.find({status: req.params.status});
    res.json(users);
}

const changeStatus = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate (id, req.body , {new: true});
    res.json(user);
}

const topBooks = async (req, res) => {
    const users = await User.find().sort({books_sold: -1}).limit(15);
    res.json(users);
}




module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    changeStatus,
    topBooks,
    getOrders
};