const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const booksSchema = new Schema({
    _id : {
        type : Schema.Types.ObjectId,
        default : () => new mongoose.Types.ObjectId()
    },
    titulo: String,
    autor: String,
    descripcion: String,
    genero: String,
    fecha_publicacion: {
        type : Date,
        default : new Date()
    },
    disponibilidad: Boolean,
    cantidad_stock: Number,
    puntuacion_promedio: Number,
    precio: Number,
    imagen_url: String

}, {
    versionKey:false
});

module.exports = model('Books',booksSchema);
