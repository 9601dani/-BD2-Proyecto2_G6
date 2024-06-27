const mongose = require ('mongoose');
const Schema = mongose.Schema;
const model = mongose.model;

const ordersSchema = new Schema({

    fecha_pedido: String,
    estado: String,
    precio_total: Number,
    id_usuario: {type: Schema.Types.ObjectId, ref: 'users'},
    direccion_envio:String,
    libros: [{
        id_libro: {type: Schema.Types.ObjectId, ref: 'books'},
        subtotal: Number,
        cantidad: Number
    }],
    metodo_pago: String

}, {
    versionKey:false
});

module.exports = model('Orders',ordersSchema);