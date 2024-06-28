const mongoose = require('mongoose');
const { Schema } = mongoose;
const model = mongoose.model;

const userSchema = new Schema({
    _id : {
        type : Schema.Types.ObjectId,
        auto: true
    },
    username : String,
    password : String,
    complete_name : String,
    email : String,
    phone : String,
    address : String,
    register_date : {
        type : Date,
        default : new Date()
    },
    rol : String,
    photo : String,
    payment_method : String
},
{
    versionKey : false
});

module.exports = model('Users', userSchema);
