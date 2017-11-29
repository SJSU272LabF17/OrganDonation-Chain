var Organ = require('../models/Organ.js');
var mongoose = require('mongoose');
var AppointmentController = require('../controllers/AppointmentController.js');

/**
 * used by donor page to create the organ.
 */
exports.createOrgan = function(req, res) {
    var organ = new Organ({
        name: req.body.name,
        donorId: req.body.donorId
    });
    organ.save().then(function(organ) {
        res.status(200).send(organ);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the organ."});
    });
};

exports.findAll = function(req, res) {
    Organ.find(function(err, organs){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving organs info."});
        } else {
            res.send(organs);
        }
    });
};

exports.update = function(req, res) {
    if (req.params.organId == null) {
        res.status(400).send({message : "no organId passed"});
    }
    var organQuery = Organ.findById(req.params.organId);
    console.log(req.params.organId);
    organQuery.exec(function(err, organ) {
        console.log(req.params.organ);
        organ.organTestInfo = req.body.organTestInfo;
        organ.sourceHospital = req.body.sourceHospital;
        var promise = organ.save();
        promise.then(organ => AppointmentController.apptInactive(organ, req.body.appointmentId, res))
            .catch(function (err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Appointment."});
        });
    });
};
