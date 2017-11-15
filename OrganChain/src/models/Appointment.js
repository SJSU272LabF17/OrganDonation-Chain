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

// 5a0bcfad128059327b27c77d don
// 5a0bcfc0128059327b27c77e hos
// organ 5a0bcff5c28561328755fb29
// appt 5a0bd3c7d092f632e1cb586b
