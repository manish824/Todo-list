// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userName: String,
    title: String,
    description: String
});

module.exports = mongoose.model('Task', taskSchema);
