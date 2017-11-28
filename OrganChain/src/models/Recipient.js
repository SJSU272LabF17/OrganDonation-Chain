var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recipientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    organ: String,
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' },
    email: String,
    phone: Number,
    status: String,
    testInfo: Object,
    allotedOrganId:  { type: Schema.Types.ObjectId, ref: 'Organ' },   //null by default
    address: {
        street: String,
        line2: String,
        city: String,
        state: String,
        zip: Number
    }
});
module.exports = mongoose.model('Recipient', recipientSchema);
// when unos will make an appointment, they will create an appointment for transplant and update the recipient with the organ id,
// also update the hospital.
// once transplant is done, we will update the organ with the target hospital and make the appointments inactive.
