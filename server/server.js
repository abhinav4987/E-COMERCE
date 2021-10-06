const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const connectDatabase = require('./config/database');
const path = require('path');



// middlewares
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());

// database initialization
connectDatabase();


// Route imports
const PORT = process.env.PORT || 5001
server.listen(PORT, () => {
    console.log("Server is running!");
})