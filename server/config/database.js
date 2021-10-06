const mongoose = require("mongoose");

const connectDatabase = () => {
    
    const URI = process.env.DB_URI || "mongodb://localhost:27017/ecomerce";
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log("Database server Up!");
    });
};

module.exports = connectDatabase;