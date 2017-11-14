var mongoose = require("mongoose");
donorSchema = new mongoose.Schema({
    name : String,
    donorId: Number,
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