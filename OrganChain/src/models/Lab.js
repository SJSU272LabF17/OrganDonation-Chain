var mongoose = require("mongoose");
labSchema = new mongoose.Schema({
    id: Number,
    BloodType : String,
    Class1Protein: String,
    Class2Protein: String,
    Lymphocytes: String,
    HLA: String,
    Class2Antigen: String,
    OrganSpecificInfo: String,
    DoctorNotes: String
});
module.exports = mongoose.model('Lab', labSchema);