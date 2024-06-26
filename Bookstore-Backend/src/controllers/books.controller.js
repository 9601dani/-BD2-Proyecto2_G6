const Book = require('../models/Books');

const getAll = async (req, res) => {
    const books = await Book.find();
    res.json(books);
}

const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
}

const addBook = async (req, res) => {
    const { titulo, autor, descripcion, genero, fecha_publicacion, disponibilidad, cantidad_stock, puntuacion_primedio, precio,  imagen_url } = req.body;
    const newBook = new Book(
        { titulo, autor, descripcion, genero, fecha_publicacion, disponibilidad,
            cantidad_stock, puntuacion_primedio, precio,  imagen_url
        });
    const bookSaved = await newBook.save();
    res.json({ message: 'Book added', value: bookSaved });
};

const deleteBook = async (req, res) => {
    const bookDeleted = await Book.deleteOne({ _id: req.params.id });
    res.json({ deleted: !!bookDeleted, ok: true });
};

const updateBook = async (req, res) => {
    const updated = await Book.updateOne({ _id: req.params.id }, req.body);
    res.json({ updated: !!updated });
}

const getPuntuacionById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book.puntuacion_primedio);
};

const getBooksByAuthorId = async (req, res) => {
    const books = await Book.find({ autor: req.params.id });
    res.json(books);
}

module.exports = {
    getAll,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
    getPuntuacionById,
    getBooksByAuthorId
}
