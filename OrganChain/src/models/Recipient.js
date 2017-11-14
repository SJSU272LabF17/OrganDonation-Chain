var mongoose = require("mongoose");
recipientSchema = new Schema({
    recipientId: Number,
    name: String,
    age: Number,
    organ: String,
    hospital: Number,
    email: String,
    phone: Number,
    lab: Number,
    allotedOrganId: Number,   //null by default
    address: {
        street: String,
        line2: String,
        city: String,
        state: String,
        zip: number
    }
});
module.exports = mongoose.model('Recipient', recipientSchema);
