const Author = require('../models/Authors');

const getAll = async (req, res, next) => {
    const authors = await Author.find();
    res.json(authors);
    next()
};

const getAuthorsActive = async (req, res, next) => {
    const authors = await Author.find({ active: true });
    res.json(authors);
    next()
};

const getAuthorById = async (req, res, next) => {
    const author = await Author.findById(req.params.id);
    res.json(author);
    next()
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

const updateAuthor = async (req, res) => {
    const updated = await Author.updateOne({ _id: req.params }, req.body);
    res.json({ updated: !!updated });
}

module.exports = {
    getAll,
    getAuthorsActive,
    getAuthorById,
    addAuthor,
    deleteAuthor,
    updateAuthor
}
