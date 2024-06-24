const mongoose = require('mongoose');

const host = 'localhost';
const port = '27017';
const database = 'Paises'; // pendiente de definir

async function connect() {
    try {
        await mongoose.connect(`mongodb://${host}:${port}/${database}`, {
            family: 4
        });
        console.log('Conectado a la base de datos: '+ database);
    } catch (error) {
        console.error('Error de conecxion', error);
    }
}

module.exports = { connect };