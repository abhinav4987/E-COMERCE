const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary")
var cors = require("cors");
const path = require('path');
require("dotenv").config();
// handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


// middlewares
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(fileUpload());

// database initialization
connectDatabase();

cloudinary.config({ 
    cloud_name: 'dfwfghwgo', 
    api_key: '173534259168265', 
    api_secret: 'OPXdise0-ggyV1hgimBpIj1_2Ak' 
});

// Route imports
const PORT = process.env.PORT || 5001
const user = require('./routes/user.routes');
const product  = require('./routes/product.routes');


server.use("/api/v1",user);
server.use("/api/v1",product);

let runninServer = server.listen(PORT, () => {
    console.log("Server is running!");
})




// shutting down aerver because of unhandled error
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    runninServer.close(() => {
        process.exit(1);
    });
});