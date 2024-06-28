const User = require('../models/Users');
const Order = require('../models/Orders');
const Book = require('../models/Books');
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
    try {
        const top_books = await Order.aggregate([
            { $unwind: '$libros' },
            { $group: { _id: '$libros._id', total: { $sum: '$libros.cantidad_stock' } } },
            { $sort: { total: -1 } },
            { $limit: 10 }
        ]);
        
        if (!top_books || top_books.length === 0) {
            res.status(404).json({ message: 'Libros no encontrados' });
            return;
        }

        const bookIds = top_books.map(book => book._id);
        const books = await Book.find({ _id: { $in: bookIds } })
            .populate('autor')
            .exec();

        const result = top_books.map(book => {
            const bookDetail = books.find(b => b._id.toString() === book._id.toString());
            return {
                _id: book._id,
                total: book.total,
                book_details: bookDetail
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
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