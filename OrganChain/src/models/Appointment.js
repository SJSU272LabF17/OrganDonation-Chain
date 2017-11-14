var mongoose = require("mongoose");
appointmentSchema = new mongoose.Schema({
    date: Date,
    sourceHospital: Number,
    userID: Number,
    organ: String,     //If you know how to use enum, do that.
    status: String,       //active or inactive
    type: String     //testing or transplant
});
module.exports = mongoose.model('Appointment', appointmentSchema);
