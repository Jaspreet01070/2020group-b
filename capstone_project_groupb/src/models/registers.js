const mongoose = require("mongoose");

// Collection index names and data types
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    country: String,
    contactnumber: String,
    username: String,
    password: String,
    confirmpassword: String
})

// create collection
const Register = new mongoose.model("Register", userSchema);

module.exports = Register;