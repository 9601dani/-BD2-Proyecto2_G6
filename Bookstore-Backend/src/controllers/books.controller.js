const Book = require('../models/Books');
const Author = require('../models/Authors');

const getAll = async (req, res) => {
    const books = await Book.find();
    res.json(books);
}

const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
}

const addBook = async (req, res) => {
    const { titulo, autor, descripcion, genero, fecha_publicacion, disponibilidad, cantidad_stock, puntuacion_promedio, precio,  imagen_url } = req.body;
    const newBook = new Book(
        { titulo, autor, descripcion, genero, fecha_publicacion, disponibilidad,
            cantidad_stock, puntuacion_promedio, precio,  imagen_url
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

const getBooksByFilter = async (req, res) => {
    const { filter, value } = req.params;
    let books;
    switch (filter) {
        case 'titulo':
            books = await Book.find({ titulo:  { $regex: value, $options: 'i' } });
            res.json(books);
            break;
        case 'autor':
            const authors = await Author.find({ name: { $regex: value, $options: 'i' } });
            books = await Book.find({ autor: { $in: authors.map(author => author._id) } });
            res.json(books);
            break;
        case 'genero':
            books = await Book.find({ genero:  { $regex: value, $options: 'i' } });
            res.json(books);
            break;
        case 'precio':
            books = await Book.find({ precio: value });
            res.json(books);
            break;
        case 'puntuacion':
            books = await Book.find({ puntuacion_promedio: value });
            res.json(books);
            break;
        default:
            res.status(400).json({ message: 'Invalid filter'});
    }
}

module.exports = {
    getAll,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
    getPuntuacionById,
    getBooksByAuthorId,
    getBooksByFilter
}
