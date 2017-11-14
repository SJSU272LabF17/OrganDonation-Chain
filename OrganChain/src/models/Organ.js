var mongoose = require("mongoose");
organSchema = new mongoose.Schema({
    name : String,
    id: Number,
    donorId: Number,
    organTestInfo: Number,
    sourceHospital: Number,
    targetHospital: Number
});
module.exports = mongoose.model('Organ', organSchema);