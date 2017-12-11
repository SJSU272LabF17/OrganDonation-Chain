var Hospital = require('../models/Hospital.js');
var request = require('request-promise');
var config = require('../config/database.config.js');
const blockchain = config.blockchain + "Hospital";

module.exports = function(passport) {
    var module = {};
    module.hospitalLogin = function(req,res) {
        passport.authenticate('local', function(err, hospital) {
            if(err) {
                return res.status(400).send({message: 'Hospital not found'});
            }
            req.login(hospital._id, function(err){
                if(err) {
                    return res.status(400).send({message: 'Hospital not found'});
                }
                res.status(200).send(hospital);
            });
        })(req, res);
    };

    module.getAllAppts = function (req, res) {
        var donorId = req.params.donorId;
        var sql = Appointment.find().where('donorId').equals(donorId);
        sql.populate("donorId").populate("organ").populate("sourceHospital")
            .exec(function(err, appts){
                if(err) {
                    res.status(500).send({message: "Some error occurred while retrieving appts."});
                } else {
                    res.send(appts);
                }
        });
    };

    module.create = function(req, res) {
        var sql = Hospital.find().where('name').equals(req.body.name).where('zip').equals(req.body.zip);
        sql.exec(function(err, hospital) {
            if (hospital && hospital.length == 0) {
                var hospital = new Hospital({name: req.body.name, userType:"Hospital", address: req.body.address, zip: req.body.zip,
                    phone: req.body.phone, email: req.body.email, password: req.body.password, chekUpDate: new Date(Date.now())});
                hospital.save().then(function(hospital) {
                    hospital.message = "Hospital successfully registered";
                    return hospital;
                }).then(hospital => {
                    var hospitalCC = {
                        "$class": "org.organchain.Hospital",
                        "hospitalId": hospital._id.toString(),
                        "name": hospital.name,
                        "email": hospital.email,
                        "address": hospital.address
                    };

                    var options = {
                        url : blockchain,
                        headers : config.headers,
                        body: JSON.stringify(hospitalCC)
                    };

                    return request.post(options).then(response => {
                        let json = JSON.parse(response);
                        res.send(hospital);
                    }).catch(err => {
                        console.log("error in saving Hospital CC: " + err);
                        throw err;
                    });
                }).catch(function(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while creating the hospital. " + err});
                });
            } else {
                return res.status(400).send({message:"bad request. Hospital already registered"});
            }
        });
    };

    module.findAll = function(req, res) {
        Hospital.find(function(err, hospitals){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving hospitals info."});
            } else {
                res.send(hospitals);
            }
        });
    }

    module.updateHospital = function(req, res) {
        if (req.params.hospitalId == null) {
            res.status(400).send({message : "no hospitalId passed"});
        }
        Hospital.findById(req.params.hospitalId, function(err, hospital) {
            hospital.chekUpDate = new Date(req.body.chekUpDate);
            hospital.save(function(err, result){
                if(err) {
                    res.status(500).send({message: "Some error occurred while updating the hospital."});
                } else {
                    res.send(result);
                }
            });
        });
    };

    module.getHospitalsByZip = function(req, res) {
        let findzip = parseInt(req.params.zip);
        var hosps = [];
        Hospital.find({$or : [{"zip": {$gte:findzip-1, $lt:findzip+1 }},{"zip":{$gte:findzip-10, $lt:findzip+10 }},
            {"zip":{$gte:findzip-100, $lt:findzip+100 }}]}, (err, hospitals) => {
            if(err) {
                res.status(500).send({message: "Some error occurred while updating the hospital."});
            } else {
                hosps=hospitals;
                for (var i = hosps.length - 1; i >= 0; i--) {
                    if(hosps[i].chekupdate){
                        var adjustedChekUpDate = updatedTime(hosps[i]);
                        hosps[i].chekUpDate = (new Date(adjustedChekUpDate)).toLocaleString();
                    }
                }
                res.send(hosps);
            }
        });
    };

    var updatedTime = function(hospital) {
        return hospital.chekupdate.getTime()+(hospital.chekupdate.getHours()<9 ? ((9-hospital.chekupdate.getHours())*60*60*1000) : 0) +
            (hospital.chekupdate.getHours()>18 ? ((32-hospital.chekupdate.getHours())*60*60*1000) : 0) - hospital.chekupdate.getMinutes()*60*1000-
            hospital.chekupdate.getSeconds()*1000 - hospital.chekupdate.getMilliseconds() + + (hospital.chekupdate.getDay()==0? (24*60*60*1000):0) +
            (hospital.chekupdate.getDay()==6 ? (2*24*60*60*1000):0);
    };

    module.updatedHospitalTime = function(date) {
        return date.getTime()+(date.getHours()<9 ? ((9-date.getHours())*60*60*1000) : 0) +
            (date.getHours()>18 ? ((32-date.getHours())*60*60*1000) : 0) - date.getMinutes()*60*1000-
            date.getSeconds()*1000 - date.getMilliseconds() + + (date.getDay()==0? (24*60*60*1000):0) +
            (date.getDay()==6 ? (2*24*60*60*1000):0);
    };

    module.updateHospitalByEmail = (req, res) => {
        Hospital.findOneAndUpdate({email:req.params.email}, req.body, {new:true}, (err, someHospital) => {
            if(err){
              res.send({message:err});
            }
            res.json(someHospital);
          });
    };

    return module;
}