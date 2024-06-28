const Review = require('../models/Reviews');
const Book = require('../models/Books');

const addReview = async (req, res) => {
    const { id_book, id_user, review, rating } = req.body;
    const newReview = new Review({ id_book, id_user, review, rating });
    const reviewSaved = await newReview.save();
    

    // Update book rating
    const bookRating = await Review.aggregate([
        { $group: { _id: id_book, avg: { $avg: "$rating" } } } ]);

    console.log(bookRating);

    await Book.updateOne({ _id: id_book }, { puntuacion_promedio: bookRating[0].avg });

    res.json({ message: 'Review added', value: reviewSaved });
}

const getReviewsByBookId = async (req, res) => {
    const reviews = await Review.find({ id_book: req.params.id });
    res.json(reviews);
}

module.exports = {
    addReview,
    getReviewsByBookId
}
