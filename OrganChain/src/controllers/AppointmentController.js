var Appointment = require('../models/Appointment.js');
import mongoose from 'mongoose';
import { appointmentSchema } from '../models/Appointment';
const TestingAppointment = mongoose.model('Appointment', appointmentSchema);
exports.create = function(req, res) {

    // Create and Save a new Appointment
    if(req.body.date) {
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
                                  req.body.donorID,
                                  req.body.organ,
                                  req.body.status,
                                  req.body.type
                                )
    promise.then(function(appointment) {
        console.log("success");
        res.send(appointment);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Appointment."});
    });
};

exports.appointmentSave = function(date, sourceHospital, donorId, organ, status, type) {
    var appointment = new Appointment({
        date : date,
        sourceHospital: sourceHospital, 
        donorID: donorId, 
        organ: organ,
        status: status, 
        type: type
    });
    var promise = appointment.save();
    return promise
}

exports.findOne = function(req, res) {

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

exports.scheduledHospitalAppts = function (req, res) {
    var apptType = req.query.type;
    var apptKeyword;
    var sql = Appointment.find().where('status').equals('active');
    if (apptType == 'testing') {
        apptKeyword = 'testing';
    } else if(apptType == 'transplant') {
        apptKeyword = apptType;
    } else {
        apptKeyword = null;
    }
    if (apptKeyword != null) {
        sql.where('type').equals(apptKeyword)
    }

    sql.populate("donorID").populate("organ").populate("sourceHospital")
        .exec(function(err, appts){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving appts."});
            } else {
                res.send(appts);
            }
        });
};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
};

//Appointment
export const createTestingAppointment = (req,res) => {
    let newAppointment = new TestingAppointment(req.body);
    newAppointment.save((err, testingAppointment) =>{
        if(err){
            res.send(err);
        }
        res.json(`${req.body} + has been added`);
    })
    console.log('createTestingAppointment');
    //res.json("POST");
} 

export const getAppointmentByEmail = (req,res) => {
    console.log('getAppointmentByEmail');
    TestingAppointment.find({}, (err, appo) => {
        if(err){
            res.send(err);
        }
        res.json(appo);
    });
    //res.json("GET");
}
