var Organ = require('../models/Organ.js');
var mongoose = require('mongoose');

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
    Organ.findById(req.params.organId, function(err, organ) {
        organ.organTestInfo = req.body.organTestInfo;
        organ.sourceHospital= req.body.sourceHospital;
        organ.save(function(err, result){
            if(err) {
                res.status(500).send({message: "Some error occurred while updating the organ."});
            } else {
                res.send(result);
            }
        });
    });
};

// //Organ
// exports.organCreate = (req, res) => {
//     console.log('organCreate called');
//     let newOrgan= new organModel(req.body);
//     newOrgan.save((err, someOrgan) => {
//         if(err){
//             res.send(err);
//         }
//         res.json(someOrgan);
//     })
//     //res.json("POST");
// }
//
// exports.getOrganByEmail = (req, res) => {
//     console.log('getOrganByEmail called');
//     //let somedonor;
//     DonorModel.find({email:req.params.email},(err, somedonor) => {
//         if(err){
//             res.send(`Yaha per fat raha hai ${err}`);
//         }
//         if(!somedonor){
//             res.json(`Donor not found`);
//         }
//         console.log(somedonor);
//         let donorsId = somedonor.pop();
//         console.log(donorsId._id);
//         organModel.find({donorID:donorsId._id}, (err,someOrgan) => {
//             if(err){
//                 res.send(err);
//             }
//             console.log(someOrgan);
//             res.json(someOrgan);
//         })
//     });
//    //es.json("GET");
// }