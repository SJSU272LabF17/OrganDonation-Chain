var mongoose = require("mongoose");
Schema = mongoose.Schema;
organSchema = new mongoose.Schema({
    name : String,
    donorID: { type: Schema.Types.ObjectId, ref: 'Donor' },
    organTestInfo: Object,
    sourceHospital: { type: Schema.Types.ObjectId, ref: 'Hospital' },
    targetHospital: { type: Schema.Types.ObjectId, ref: 'Hospital' }
});
module.exports = mongoose.model('Organ', organSchema);