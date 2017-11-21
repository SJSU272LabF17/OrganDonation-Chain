var mongoose = require("mongoose");
var hospitalSchema = new mongoose.Schema({
    name : String,
    address : {
        street:String,
        line2:String,
        city: String,
        State: String,
        zip: Number
    },
    phone : Number,
    email : String,
    password : String
});
module.exports = mongoose.model('Hospital', hospitalSchema);