// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    imageFile: String
});

module.exports = mongoose.model('User', userSchema);
