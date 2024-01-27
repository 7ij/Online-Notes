const mongoose = require('mongoose');
const noteListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    title: String,
});

module.exports = mongoose.model('NoteList', noteListSchema);