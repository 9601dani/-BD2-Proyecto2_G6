const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const reviewSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User is required']
    },
    id_book: {
        type: Schema.Types.ObjectId,
        ref: 'Books',
        required: [true, 'Book is required']
    },
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    rating: {
        type: Number,
        required: [true, 'Score is required']
    },
}, {
    versionKey: false
});

module.exports = model('Reviews', reviewSchema);
