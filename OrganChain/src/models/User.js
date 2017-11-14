// User.js
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    type: String
});
module.exports = mongoose.model('Note', UserSchema);