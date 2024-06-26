const Author = require('../models/Authors');

const getAll = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

const getAuthorsActive = async (req, res) => {
    const authors = await Author.find({ active: true });
    res.json(authors);
};

const getAuthorById = async (req, res) => {
    const author = await Author.findById(req.params.id);
    res.json(author);
};

const addAuthor = async (req, res) => {
    const { name, photo, biography, active } = req.body;
    const newAuthor = new Author({ name, photo, biography, active });
    const authorSaved = await newAuthor.save();
    res.json({ message: 'Author added', value: authorSaved });
};

const deleteAuthor = async (req, res) => {
    const authorDeleted = await Author.deleteOne({ _id: req.params.id });
    res.json({ deleted: !!authorDeleted });
};

module.exports = {
    getAll,
    getAuthorsActive,
    getAuthorById,
    addAuthor,
    deleteAuthor
}
