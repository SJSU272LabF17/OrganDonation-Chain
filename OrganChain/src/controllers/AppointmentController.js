var Appointment = require('../models/Appointment.js');
var Hospital = require('../models/Hospital.js');
var hospitalController = require('../controllers/HospitalController.js');

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
                                  req.body.status,
                                  req.body.type
                                );
    promise.then(appointment => {
        console.log("success");
        console.log(appointment);
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

    sql.populate("donorId").populate("organ").populate("sourceHospital")
        .exec(function(err, appts){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving appts."});
            } else {
                res.send(appts);
            }
        });
};


// //Appointment
// exports.createTestingAppointment = (req,res) => {
//     let newAppointment = new TestingAppointment(req.body);
//     newAppointment.save((err, testingAppointment) =>{
//         if(err){
//             res.send(err);
//         }
//         res.json(`${req.body} + has been added`);
//     })
//     console.log('createTestingAppointment');
//     //res.json("POST");
// }
//
// exports.getAppointmentByEmail = (req,res) => {
//     console.log('getAppointmentByEmail');
//     TestingAppointment.find({}, (err, appo) => {
//         if(err){
//             res.send(err);
//         }
//         res.json(appo);
//     });
//     //res.json("GET");
// }
