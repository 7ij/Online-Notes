const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);