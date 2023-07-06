const db = require('./connection.js');
const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
// });


const User = mongoose.model("User", {
    email: String,
    password: String,
  });



module.exports = User;