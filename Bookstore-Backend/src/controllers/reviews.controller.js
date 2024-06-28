const Review = require('../models/Reviews');
const Book = require('../models/Books');

const addReview = async (req, res) => {
    const { id_book, id_user, review, rating } = req.body; 
    const newReview = new Review({ id_book: id_book, id_user: id_user, review, rating });
    const reviewSaved = await newReview.save();
    

    // Update book rating
    const bookRating = await Review.aggregate(
        [
            { $match: { id_book: id_book } },
            { $group: { _id: null, avg: { $avg: "$rating" } } }
        ]
    );
    console.log("rating", bookRating[0]);

    await Book.updateOne({ _id: id_book }, { puntuacion_promedio: bookRating[0].avg });
    console.log("vamos bien 2");

    res.json({ message: 'Review added', value: reviewSaved });
}

const getReviewsByBookId = async (req, res) => {
    // cambio de nombre
    const reviews = await Review.find({ id_book: req.params.id });
    res.json(reviews);
}

module.exports = {
    addReview,
    getReviewsByBookId
}
