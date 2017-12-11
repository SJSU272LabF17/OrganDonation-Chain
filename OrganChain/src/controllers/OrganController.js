var Organ = require('../models/Organ.js');
var mongoose = require('mongoose');
var AppointmentController = require('../controllers/AppointmentController.js');
var request = require('request-promise');
var config = require('../config/database.config.js');
const testedBlockchain = config.blockchain + "Tested";

/**
 * used by donor page to create the organ.
 */
exports.createOrgan = function(req, res) {

    var sql = Organ.find().where('name').equals(req.body.name).where('donorId').equals(req.body.donorId);
    sql.exec().then(function(organ) {
        if (organ && organ.length == 0) {
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
        } else {
            res.status(400).send({message:"Organ " + req.body.name + " already registered"});
        }
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

exports.findAllUserOrgans = function(req, res) {
    if (req.params.donorId == null) {
        res.status(400).send({message: "no donorId passed"});
    }
    var sql = Organ.find().where('donorId').equals(req.params.donorId).where('targetHospital').equals(undefined);
    sql.exec(function(err, organs){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving appts."});
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
        organ.organTestInfo = req.body.organTestInfo;
        organ.sourceHospital = req.body.sourceHospital;
        organ.save().then(organ => {
            var organCC = {
                "$class": "org.organchain.Tested",
                "hospital": organ.sourceHospital.toString(),
                "organ": organ._id.toString(),
                "organTestInfo" : JSON.stringify(organ.organTestInfo)
            };

            var options = {
                url : testedBlockchain,
                headers : config.headers,
                body: JSON.stringify(organCC)
            };

            return request.post(options).then(response => {
                let json = JSON.parse(response);
                res.send(organ);
            }).catch(err => {
                console.log("error in saving Tested Transaction: " + err);
                throw err;
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Appointment."});
        });
    });
};
