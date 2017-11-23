var mongoose = require("mongoose");
var hospitalSchema = new mongoose.Schema({
    name : String,
    address : String,
    zip: Number,
    phone : Number,
    email : String,
    password : String,
    message : String,
    userType : String,
    chekUpDate : Date
});
module.exports = mongoose.model('Hospital', hospitalSchema);