const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    title: String,
    details: String
});

module.exports = mongoose.model('Note', noteSchema);