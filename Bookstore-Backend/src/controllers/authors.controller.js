const Author = require('../models/Authors');

const getAll = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

const getAuthorsActive = async (req, res) => {
    const authors = await Author.find({ active: true });
    res.json(authors);
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
    const { id } = req.params;
    const updated = await Author.findByIdAndUpdate(id, req.body, {new: true});
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
