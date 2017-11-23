var mongoose = require("mongoose");
var donorSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    age : Number,
    email: String,
    phone: Number,
    address : String,
    zip: Number,
    password: String,
    message: String,
    userType : String,
    chekUpDate : Date
});
module.exports = mongoose.model('Donor', donorSchema);