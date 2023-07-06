// const mongoose = require('mongoose');

// const uri =
//   'mongodb+srv://jasongal:Galanisgate13@cluster0.lz3eglj.mongodb.net/comments?retryWrites=true&w=majority';

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log('Connected to database');
//   })
//   .catch((err) => {
//     console.log('Error connecting to the database', err);
//   });

// const db = mongoose.connection; // Get the database connection object

// module.exports = db;

const mongoose = require("mongoose")
const db = mongoose.connect(
    "mongodb+srv://kostask:zeblomadison@cluster0.0pprqos.mongodb.net/comments?retryWrites=true&w=majority"
)
module.exports = db