var Appointment = require('../models/Appointment.js');
var Hospital = require('../models/Hospital.js');
var hospitalController = require('../controllers/HospitalController.js');
var Recipient = require('../models/Recipient.js');
var Organ = require('../models/Organ.js');

/*
this method will be called by donor to create appointment by selecting a hospital. We will create an appointment and
update the hospital chekUpDate returning the appointment object.
 */
exports.create = function(req, res) {
    // Create and Save a new Appointment
    if(!req.body.date) {
        console.log("Error");
        return res.status(400).send(
            {
                message: "Appointment can not be empty"
            }
        );
    }
    var promise = appointmentSave(
      req.body.date,
      req.body.sourceHospital, 
      req.body.donorId,
      req.body.organ,
      'active',
      'testing'
    );
    promise.then(appointment => {
        Hospital.findById(req.body.sourceHospital, function(err, hospital) {
            hospital.chekUpDate = new Date(hospitalController.updatedHospitalTime(hospital.chekUpDate));
            var hospitalPromise = hospital.save();
            hospitalPromise.then(hospital => {
                res.send(appointment);
            }).catch(function(err) {
                console.log(err);
                res.status(500).send({message: "Some error occurred while creating the Appointment."});
            });
        });
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Appointment."});
    });
};

exports.createUnosAppointment = function(req, res) {
    // Create and Save a new Appointment
    if(!req.body.date) {
        console.log("Error");
        return res.status(400).send(
            {
                message: "Appointment can not be empty"
            }
        );
    }
    var appointment = new Appointment({
        date : new Date(req.body.date),
        sourceHospital: req.body.targetHospital,
        recId: req.body.recId,
        organ: req.body.organ,
        status: 'active',
        type: 'transplant'
    });
    var promise = appointment.save();
    promise.then(appointment => {
        Hospital.findById(req.body.targetHospital, function(err, hospital) {

            hospital.chekUpDate = new Date(hospitalController.updatedHospitalTime(hospital.chekUpDate));
            var hospitalPromise = hospital.save();
            hospitalPromise.then(hospital => {
                Recipient.findById(req.body.recId, function(err, recipient) {
                    recipient.allotedOrganId = req.body.organ;
                    var promiseRecipient = recipient.save();
                    promiseRecipient.then(rec => {
                       res.send(appointment);
                    });
                });
            }).catch(function(err) {
                console.log(err);
                res.status(500).send({message: "Some error occurred while creating the Appointment."});
            });
        });
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Appointment."});
    });
};

var appointmentSave = function(date, sourceHospital, donorId, organ, status, type) {
    var appointment = new Appointment({
        date : new Date(date),
        sourceHospital: sourceHospital, 
        donorId: donorId,
        organ: organ,
        status: status, 
        type: type
    });
    var promise = appointment.save();
    return promise
};

exports.findAll = function(req, res) {
    Appointment.find(function(err, appts){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving appts."});
        } else {
            res.send(appts);
        }
    });
};

/**
 * this method is used by hospital page to get the scheduled appointments. testing or transplant.
 */
exports.scheduledTestingAppts = function (req, res) {
    var sql = Appointment.find().where('type').equals('testing');

    sql.populate("donorId").populate("organ").populate("sourceHospital")
        .exec(function(err, appts){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving appts."});
            } else {
                res.send(appts);
            }
        });
};

exports.scheduledTransplantAppts = function (req, res) {
    var sql = Appointment.find().where('type').equals('transplant');

    sql.populate("donorId").populate("organ").populate("sourceHospital")
        .exec(function(err, appts){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving appts."});
            } else {
                res.send(appts);
            }
        });
};

exports.apptInactive = function (obj, appointmentId, res) {
    Appointment.findById(appointmentId, function (err, appointment) {
        appointment.status = 'inactive';
        var appointmentPromise = appointment.save();
        appointmentPromise.then(appointment => {
            res.send(obj);
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while updating the Appointment." + err});
        });
    });
};


exports.completeTransplant = function(req, res) {
    var organId = req.body.organ;
    // once transplant is done, we will update the organ with the target hospital and make the appointments inactive.
    Organ.findById(organId, function(err, organ) {
       organ.targetHospital = req.body.targetHospital;
       var organPromise = organ.save();
       organPromise.then(organ => {
           module.exports.apptInactive(organ, req.body.appointmentId, res);
       }).catch(function (err) {
           res.status(500).send({message: "Some error occurred in Organ while updating the Appointment." + err});
       });
    });
};