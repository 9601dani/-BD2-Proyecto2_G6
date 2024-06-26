const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const schema = mongoose.Schema;
const model = mongoose.model;

const authorSchema = new schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required']
    },
    biography: {
        type: String,
        required: [true, 'Biography is required']
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false
});

module.exports = model('Authors', authorSchema);

