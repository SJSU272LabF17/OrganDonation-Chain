import mongoose from 'mongoose';
var Donor = require('../models/Donor.js');
import { donorSchema } from '../models/Donor';
const DonorModel = mongoose.model('Donor', donorSchema);
exports.create = function(req, res) {

    if(!req.body.name) {
        return res.status(400).send({message: "Donor name can not be empty"});
    }
    var donor = new Donor(
        {
            name: req.body.name,
            age: req.body.age,
            organName: req.body.organName,
            email: req.body.email, 
            phone: req.body.phone, 
            address: req.body.address, 
            password: req.body.password
        }
    );
    var promise = donor.save();
    promise.then(function(donor) {
        console.log("success");
        res.send(donor);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Donor user."});
    });
};

exports.findAll = function(req, res) {
    Donor.find(function(err, donors){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving donors info."});
        } else {
            res.send(donors);
        }
    });
}

export const getdonorbyEmail = (req,res) => {
    console.log('getdonorbyID called');
    DonorModel.find({email:req.params.email},(err, somedonor) => {
        if(err){
            res.send(`Yaha per fat raha hai ${err}`);
        }
        if(!somedonor){
            res.json(`Donor not found`);
        }
        res.json(somedonor);
    });
    //res.json("GET");
}
export const addDonorbyEmail = (req,res) => {
    console.log(req.body);
    let newDonor = new DonorModel(req.body);
    console.log(req.body);
    newDonor.save((err, someDonor) => {
        if(err){
            res.send(`Yaha per fat raha hai ${err}`);
        }
        res.json(someDonor);
    });
    console.log('addDonorbyID called');
    //res.json("POST");
    
}
export const UpdateDonorbyEmail = (req,res) => {
    console.log('UpdateDonorbyID called');
    DonorModel.findOneAndUpdate({email:req.params.email}, req.body, {new:true}, (err, somedonor) => {
        if(err){
            res.send(err);
        }
        res.json(somedonor);
    })
   // res.json("PUT");
}








