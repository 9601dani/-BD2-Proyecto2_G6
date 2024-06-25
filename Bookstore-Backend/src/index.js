// creando api rest con express
const app = require('./app');
const {connect} = require("./configs/database.configs");
require('dotenv').config();
connect();

const PORT = process.env.APP_PORT || 3200;

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})