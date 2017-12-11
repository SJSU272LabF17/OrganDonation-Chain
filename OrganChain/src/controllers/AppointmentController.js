var Appointment = require('../models/Appointment.js');
var Hospital = require('../models/Hospital.js');
var hospitalController = require('../controllers/HospitalController.js')();
var Recipient = require('../models/Recipient.js');
var Organ = require('../models/Organ.js');
var request = require('request-promise');
var config = require('../config/database.config.js');
const blockchain = config.blockchain + "Offered";

/*
this method will be called by donor to create appointment by selecting a hospital. We will create an appointment and
update the hospital chekUpDate returning the appointment object.
 */
exports.create = function(req, res) {
    // Create and Save a new Appointment
    if (!req.body.date) {
        console.log("Error");
        return res.status(400).send({message: "Appointment can not be empty"});
    }
    appointmentSave(
        req.body.date,
        req.body.sourceHospital,
        req.body.donorId,
        req.body.organ,
        'active',
        'testing'
    ).then(appointment => {
        Hospital.findById(req.body.sourceHospital, function (err, hospital) {
            hospital.chekUpDate = new Date(hospitalController.updatedHospitalTime(hospital.chekUpDate));
            var hospitalPromise = hospital.save();
            hospitalPromise.then(hospital => {
                return hospital;
            }).then(hospital => {
                var thisOrgan = Organ.findById(req.body.organ, function (err, organ) {
                    var organCC = {
                        "$class": "org.organchain.Offered",
                        "donor": organ.donorId.toString(),
                        "organName": organ.name,
                        "organId": organ._id.toString()
                    };

                    var options = {
                        url: blockchain,
                        headers: config.headers,
                        body: JSON.stringify(organCC)
                    };

                    return request.post(options).then(response => {
                        res.status(200).send(appointment);
                    }).catch(err => {
                        console.log("error in saving Offered transaction: " + err);
                        res.status(500).send({message: "Some error occurred while creating the Offered transaction. " + err});
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while creating the Appointment."});
                });
            }).catch(function (err) {
                console.log(err);
                res.status(500).send({message: "Some error occurred while creating the Appointment."});
            });
        });
    });
};

exports.createUnosAppointment = function(req, res) {
    // Create and Save a new Appointment
    if(!req.body.date) {
        console.log("Error");
        return res.status(400).send({message:"Appointment can not be empty"});
    }
    if (!req.body.recId) {
        return res.status(400).send({message: "recId can not be empty" });
    }
    if (!req.body.targetHospital) {
        return res.status(400).send({message: "targetHospital can not be empty" });
    }
    if (!req.body.appointmentId) {
        return res.status(400).send({message: "AppointmentId can not be empty" });
    }
    var appointment = new Appointment({
        date : new Date(req.body.date),
        sourceHospital: req.body.targetHospital,
        recId: req.body.recId,
        organ: req.body.organ,
        donorId: req.body.donorId,
        status: 'active',
        type: 'transplant'
    });
    appointment.save().then(appointment => {
        Hospital.findById(req.body.targetHospital, function(err, hospital) {

            hospital.chekUpDate = new Date(hospitalController.updatedHospitalTime(hospital.chekUpDate));
            hospital.save().then(hospital => {
                Recipient.findById(req.body.recId, function(err, recipient) {
                    recipient.allotedOrganId = req.body.organ;
                    recipient.save().then(rec => {
                        var organCC = {
                            "$class": "org.organchain.Matched",
                            "hospital": appointment.sourceHospital.toString(),
                            "recipient": rec._id.toString(),
                            "organ": appointment.organ.toString()
                        };

                        var options = {
                            url: config.blockchain + "Matched",
                            headers: config.headers,
                            body: JSON.stringify(organCC)
                        };

                        return request.post(options).then(response => {
                            module.exports.apptInactive(appointment, req.body.appointmentId, res);
                        }).catch(err => {
                            console.log("error in saving Matched transaction: " + err);
                            res.status(500).send({message: "error in saving Matched transaction. " + err});
                        });
                    });
                });
            }).catch(function(err) {
                console.log(err);
                res.status(500).send({message: "Some error occurred while creating the Unos Appointment."});
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
    return appointment.save();
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
    if (req.params.hospitalId == null) {
        res.status(400).send({message: "Invalid hospital id."});        
    } else {
        var sql = Appointment.find().where('type').equals('testing').where('sourceHospital').equals(req.params.hospitalId);
        
            sql.populate("donorId").populate("organ").populate("sourceHospital")
                .exec(function(err, appts){
                    if(err) {
                        res.status(500).send({message: "Some error occurred while retrieving appts."});
                    } else {
                        res.send(appts);
                    }
                });        
    }
};

exports.scheduledAllTestingAppts = function (req, res) {
    var sql = Appointment.find().where('type').equals('testing');
    sql.populate("donorId").populate("organ").populate("sourceHospital").exec(function(err, appts){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving appts."});
        } else {
            res.send(appts);
        }
    });
};


exports.getAllAppts = function (req, res) {
    var donorId = req.params.donorId;
    var sql = Appointment.find().where('donorId').equals(donorId).where('status').equals('active');

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
    if (req.params.hospitalId == null) {
        res.status(400).send({message: "invalid hospital id."});        
    } else {

    var sql = Appointment.find().where('type').equals('transplant').where('sourceHospital').equals(req.params.hospitalId);;

    sql.populate("donorId").populate("recId").populate("organ").populate("sourceHospital")
        .exec(function(err, appts){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving appts."});
            } else {
                res.send(appts);
            }
        });
    }
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

       organ.save().then(organ => {
           var organCC = {
               "$class": "org.organchain.Transplant",
               "organ": organId.toString()
           };

           var options = {
               url: config.blockchain + "Transplant",
               headers: config.headers,
               body: JSON.stringify(organCC)
           };

           return request.post(options).then(response => {
               module.exports.apptInactive(organ, req.body.appointmentId, res);
           }).catch(err => {
               console.log("error in saving Transplant transaction: " + err);
               res.status(500).send({message: "error in saving Transplant transaction. " + err});
           });
       }).catch(function (err) {
           res.status(500).send({message: "Some error occurred in Organ while updating the Appointment." + err});
       });
    });
};