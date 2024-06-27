const Review = require('../models/Reviews');
const Book = require('../models/Books');

const addReview = async (req, res) => {
    const { book_id, user_id, review, rating } = req.body;
    const newReview = new Review({ book_id, user_id, review, rating });
    const reviewSaved = await newReview.save();

    // Update book rating
    const bookRating = await Review.aggregate(
        [
            { $match: { book_id: book_id } },
            { $group: { _id: null, avg: { $avg: "$rating" } } }
        ]
    );

    await Book.updateOne({ _id: book_id }, { puntuacion_promedio: bookRating[0].avg });

    res.json({ message: 'Review added', value: reviewSaved });
}

const getReviewsByBookId = async (req, res) => {
    // cambio de nombre
    const reviews = await Review.find({ book_id: req.params.id });
    res.json(reviews);
}

module.exports = {
    addReview,
    getReviewsByBookId
}
