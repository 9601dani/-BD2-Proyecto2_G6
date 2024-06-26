const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
//Routes
const ordersRoutes = require('./routes/orders.routes');
const authorsRoutes = require('./routes/authors.routes');
const uploadRoutes = require('./routes/upload.routes');
const usersRoutes = require('./routes/users.routes');
const booksRoutes = require('./routes/books.routes');
const reviewRoutes = require('./routes/reviews.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});

app.use(ordersRoutes);
app.use(usersRoutes);
app.use(authorsRoutes);
app.use(uploadRoutes);
app.use(reviewRoutes);
app.use(booksRoutes);

module.exports = app;
