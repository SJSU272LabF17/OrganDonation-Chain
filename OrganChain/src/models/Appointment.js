var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var appointmentSchema = new mongoose.Schema({
    date: Date,
    sourceHospital: { 
        type: Schema.Types.ObjectId, ref: 'Hospital'
    },
    donorID: { 
        type: Schema.Types.ObjectId, ref: 'Donor' 
    },
    organ: { 
        type: Schema.Types.ObjectId, ref: 'Organ' 
    },     //If you know how to use enum, do that.
    status: String,       //active or inactive
    type: String     //testing or transplant
});
module.exports = mongoose.model('Appointment', appointmentSchema);