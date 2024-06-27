const Review = require('../models/Reviews');
const Book = require('../models/Books');

const addReview = async (req, res) => {
    const { book_id, user_id, review, rating } = req.body;
    const newReview = new Review({ book_id, user_id, review, rating });
    const reviewSaved = await newReview.save();

    // Update book rating
    const reviews = await Review.find({ book_id });
    let totalRating = 0;
    for(const review of reviews) {
        totalRating += review?.rating;
    }
    const bookRating = totalRating / reviews.size;
    await Book.updateOne({ _id: book_id }, { puntuacion_promedio: bookRating });

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
