var mongoose = require("mongoose");
var donorSchema = new mongoose.Schema({
    name : String,
    age : Number,
    organName: String,
    email: String,
    phone: Number,
    address : {
        street: String,
        line2: String,
        city: String,
        state: String,
        zip: Number
    },
    password: String
});
module.exports = mongoose.model('Donor', donorSchema);