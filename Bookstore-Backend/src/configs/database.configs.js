const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;

async function connect() {
    try {
        await mongoose.connect(`mongodb://${host}:${port}/${database}`, {
            family: 4
        });
        console.log('Conectado a la base de datos: '+ database);
    } catch (error) {
        console.error('Error de conexion', error);
    }
}

module.exports = { connect };