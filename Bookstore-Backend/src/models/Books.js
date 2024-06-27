const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const booksSchema = new Schema({

    _id: Schema.ObjectId,
    titulo: String,
    autor: String,
    descripcion: String,
    genero: String,
    fecha_publicacion: Date,
    disponibilidad: Boolean,
    cantidad_stock: Number,
    puntuacion_promedio: Number,
    precio: Number,
    imagen_url: String

}, {
    versionKey:false
});

module.exports = model('Books',booksSchema);
