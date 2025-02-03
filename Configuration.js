const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/");

//check database connected or not
connect.then(() => {
    console.log("Database connected Successfully");
}).catch(() => {
    console.log("Database connection failed"); // Added error handling
});
//create a schema 
// Create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection Part
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;
