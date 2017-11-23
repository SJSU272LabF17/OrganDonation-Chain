import mongoose from 'mongoose';
import { hospitalSchema } from '../models/Hospital'

const hospitalModel = mongoose.model('Hospital', hospitalSchema);
var Hospital = require('../models/Hospital.js');

exports.hospitalLogin = function(req,res) {
    //passport.authenticate('local', function(err, user, info) {
        if(!req.body.email) {
            return res.status(400).send({message: 'Hospital not found'});
        }
        hospitalModel.find({email:req.body.email, password:req.body.password},(err, someHospital) => {
            if(err){
                res.send('Hospital not found');
            }
            if(!someHospital){
                res.json('Hospital not found');
            }
            res.status(200).send(someHospital);
        });
    //})(req, res);
}

exports.create = function(req, res) {
    var hospital = new Hospital({name: req.body.name, userType:"Hospital", address: req.body.address, zip: req.body.zip, 
        phone: req.body.phone, email: req.body.email, password: req.body.password, chekUpDate: new Date(Date.now())});
    var promise = hospital.save();
    promise.then(function(hospital) {
        hospital.message = "Hospital successfully registered";
        res.status(200).send(hospital);
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

exports.getHospitalsByZip = function(req, res) {
    let findzip = req.params.zip;
    hospitalModel.find({"zip":{$gte:findzip-10, $lt:findzip+10 }}, (err, hospitals) => {
        if(err){
            res.send(err);
        } else {
            for (var i = hospitals.length - 1; i >= 0; i--) {
                if(hospitals[i].chekupdate){
                    var adjustedChekUpDate = hospitals[i].chekupdate.getTime()+(hospitals[i].chekupdate.getHours()<9 ? ((9-hospitals[i].chekupdate.getHours())*60*60*1000) : 0) + 
                        (hospitals[i].chekupdate.getHours()>18 ? ((32-hospitals[i].chekupdate.getHours())*60*60*1000) : 0) - hospitals[i].chekupdate.getMinutes()*60*1000- 
                        hospitals[i].chekupdate.getSeconds()*1000 - hospitals[i].chekupdate.getMilliseconds() + + (hospitals[i].chekupdate.getDay()==0? (24*60*60*1000):0) + 
                        (hospitals[i].chekupdate.getDay()==6 ? (2*24*60*60*1000):0);
                    hospitals[i].chekUpDate = (new Date(adjustedChekUpDate)).toLocaleString();
                }
            }
            res.json(hospitals);            
        }
    })
}

export const updateHospitalByEmail = (req, res) => {
    hospitalModel.findOneAndUpdate({email:req.params.email}, req.body, {new:true}, (err, someHospital) => {
        if(err){
          res.send(err);
        }
        res.json(someHospital);
      });
}