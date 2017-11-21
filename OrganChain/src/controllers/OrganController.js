import mongoose from 'mongoose';
import {organSchema} from '../models/Organ';
import {donorSchem} from '../models/Donor';
var Organ = require('../models/Organ.js');
//var mongoose = require('mongoose');
const organModel= mongoose.model('Organ');
const DonorModel = mongoose.model('Donor');
exports.create = function(req, res) {

    var organ = new Organ({
        name: req.body.name, 
        donorID: req.body.donorID, 
        organTestInfo: req.body.organTestInfo,
        sourceHospital: req.body.sourceHospital, 
        targetHospital: req.body.targetHospital
    });
    var promise = organ.save();
    promise.then(function(organ) {
        res.send(organ);
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
        organ.save(function(err, result){
            if(err) {
                res.status(500).send({message: "Some error occurred while updating the organ."});
            } else {
                res.send(result);
            }
        });
    });
};


exports.cleanup = function (req, res) {
    // mongoose.connection.db.dropCollection('appointments', function(err, result) {
    //     if(err) {
    //         res.status(500).send({message: "Could not update note with id "});
    //     }
    // });
    mongoose.connection.db.dropCollection('organs', function(err, result) {
        if(err) {
            res.status(500).send({message: "Could not update note with id "});
        }
    });

    mongoose.connection.db.dropCollection('hospitals', function(err, result) {
        if(err) {
            res.status(500).send({message: "Could not update note with id "});
        }
    });
    mongoose.connection.db.dropCollection('donors', function(err, result) {
        if(err) {
            res.status(500).send({message: "Could not update note with id "});
        } else {
            res.send(result);
        }
    });
};

//Organ
export const organCreate = (req, res) => {
    console.log('organCreate called');
    let newOrgan= new organModel(req.body);
    newOrgan.save((err, someOrgan) => {
        if(err){
            res.send(err);
        }
        res.json(someOrgan);
    })
    //res.json("POST");
}

export const getOrganByEmail = (req, res) => {
    console.log('getOrganByEmail called');
    //let somedonor;
    DonorModel.find({email:req.params.email},(err, somedonor) => {
        if(err){
            res.send(`Yaha per fat raha hai ${err}`);
        }
        if(!somedonor){
            res.json(`Donor not found`);
        }
        console.log(somedonor);
        let donorsId = somedonor.pop();
        console.log(donorsId._id);
        organModel.find({donorID:donorsId._id}, (err,someOrgan) => {
            if(err){
                res.send(err);
            }
            console.log(someOrgan);
            res.json(someOrgan);
        })
    });
   //es.json("GET");
}