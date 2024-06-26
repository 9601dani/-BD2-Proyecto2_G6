const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const booksSchema = new Schema({

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