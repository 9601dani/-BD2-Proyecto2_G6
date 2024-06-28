const User = require('../models/Users');
const Shema = require('mongoose').Schema;

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!password) {
        res.status(400).json({ message: 'la contraseña es requerida', 'ok': false});
        return;
    }
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.findOne({ username: email });
            if (!user) {
                res.status(404).json({ message: 'No existe el usuario', 'ok': false});
                return
            }
            if (user.password !== password) {
                res.status(401).json({ message: 'Contraseña incorrecta', 'ok': false});
                return;
            }
            res.status(200).json({ user, 'ok': true });
            return;
        }

        if (user.password !== password) {
            res.status(401).json({ message: 'Contraseña incorrecta', 'ok': false});
            return;
        }
        res.status(200).json({ user, 'ok': true });

}



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
    console.log(user);
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

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ', error: error.message });
    }
}




module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    changeStatus,
    topBooks,
    getOrders,
    login,
    getUserById
};