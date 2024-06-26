const mongoose = require('mongoose');
const { Schema } = mongoose;
const model = mongoose.model;

const userSchema = new Schema({
    _id : String,
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