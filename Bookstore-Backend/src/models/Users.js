const mongoose = require('mongoose');
const { Schema } = mongoose;
const model = mongoose.model;

const userSchema = new Schema({
    _id : Schema.Types.ObjectId,
    username : String,
    password : String,
    complete_name : String,
    email : String,
    phone : String,
    address : String,
    register_date : Date,
    rol : String,
    photo : String,
    payment_method : String
},
{
    versionKey : false
});

module.exports = model('Users', userSchema);