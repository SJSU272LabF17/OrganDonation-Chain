var Appointment = require('../models/Appointment.js');
exports.create = function(req, res) {

    // Create and Save a new Appointment
    if(!req.body.date) {
        return res.status(400).send({message: "Appointment can not be empty"});
    }
    var promise = appointmentSave(req.body.date, req.body.sourceHospital, req.body.userId, req.body.organ,
        req.body.status, req.body.type)
    promise.then(function(appointment) {
        console.log("success");
        res.send(appointment);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Appointment."});
    });
};

appointmentSave = function(date, sourceHospital, userId, organ, status, type) {
    var note = new Appointment({date : date, sourceHospital: sourceHospital, userID: userId, organ: organ,
        status: status, type: type});

    var promise = note.save();
    return promise
}

exports.findOne = function(req, res) {

};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request

};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request

};

