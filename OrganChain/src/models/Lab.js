var mongoose = require("mongoose");
labSchema = new mongoose.Schema({
    id: String,
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