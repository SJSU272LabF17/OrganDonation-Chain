var mongoose = require("mongoose");
Schema = mongoose.Schema;
appointmentSchema = new mongoose.Schema({
    date: Date,
    sourceHospital: [{ type: Schema.Types.ObjectId, ref: 'Hospital' }],
    donorID: [{ type: Schema.Types.ObjectId, ref: 'Donor' }],
    organ: [{ type: Schema.Types.ObjectId, ref: 'Organ' }],     //If you know how to use enum, do that.
    status: String,       //active or inactive
    type: String     //testing or transplant
});
module.exports = mongoose.model('Appointment', appointmentSchema);

// 5a0a60f09cf2fb181398acbf hos
// 5a0a55a18f778f15c48c2359 don
// organ 5a0a62fa7d644d18617df3a9
// appt 5a0a664eb4477e18ce092769
