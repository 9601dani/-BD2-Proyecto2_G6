const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const ordersSchema = new Schema({

    fecha_pedido: Date,
    fecha_entrega: Date,
    estado: String,
    precio_total: Number,
    id_usuario: {type: Schema.Types.ObjectId, ref: 'Users'},
    direccion:String,
    libros: [{
        id_libro: {type: Schema.Types.ObjectId, ref: 'Books'},
        cantidad: Number,
        precio: Number
    }],
    metodo_pago: String

}, {
    versionKey:false
});

module.exports = model('Orders',ordersSchema);