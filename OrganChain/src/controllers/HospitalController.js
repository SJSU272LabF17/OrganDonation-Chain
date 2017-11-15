import mongoose from 'mongoose';
import { hospitalSchema } from '../models/Hospital'

const hospitalModel = mongoose.model('Hospital', hospitalSchema);
var Hospital = require('../models/Hospital.js');

exports.create = function(req, res) {

    var hospital = new Hospital({name: req.body.name, address: req.body.address, phone: req.body.phone, email: req.body.email,
        password: req.body.password});
    var promise = hospital.save();
    promise.then(function(hospital) {
        res.send(hospital);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the hospital."});
    });
};

exports.findAll = function(req, res) {
    Hospital.find(function(err, hospitals){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving hospitals info."});
        } else {
            res.send(hospitals);
        }
    });
}

export const newHospital = (req, res) => {
    console.log('newHospital called');
    let newHospital = new hospitalModel(req.body);
    newHospital.save((err, someHospital) => {
        if(err){
            res.send(err);
        }
        res.json(someHospital);
    })
    //res.json("GET");
}

export const getAllHospitals = (req, res) => {
    console.log('getAllHospitals called');
    hospitalModel.find({}, (err, hospitals) => {
        if(err){
            res.send(err);
        }
        res.json(hospitals);
    })
    //res.json("GET");
}

export const getHospitalsByZip = (req, res) => {
    console.log('getHospitalsByZip called');
    let findzip = req.params.zip;
    hospitalModel.find({"address.zip":{$gte:findzip-10, $lt:findzip+10 }}, (err, hospitals) => {
        if(err){
            res.send(err);
        }
        res.json(hospitals);
    })
    //res.json("GET");

}

export const updateHospitalByEmail = (req, res) => {
    console.log('updateHospitalByEmail called');
    hospitalModel.findOneAndUpdate({email:req.params.email}, req.body, {new:true}, (err, someHospital) => {
        if(err){
          res.send(err);
        }
        res.json(someHospital);
      });
}