// creando api rest con express
const express = require('express');
const {connect} = require("./configs/database.configs");
//const { connect } = require('./configs/database.configs');
const app = express();

/* descomentar por si hay problemas con los cors
 *  const cors = require('cors');
 * app.use(cors());
 * app.use(express.json());
 * app.use(express.urlencoded({ extended: false }));
 *
 * */

connect();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
}
);

// app.use('api',....);


const server = app.listen(port, () => {
    console.log(`Escuchando desde el servidor en el puerto: ${server.address().port}`);
}
);

