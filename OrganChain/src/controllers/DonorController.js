import mongoose from 'mongoose';
var Donor = require('../models/Donor.js');
import { donorSchema } from '../models/Donor';
const DonorModel = mongoose.model('Donor', donorSchema);

/*var passport = require('passport');
app.use(expressSessions({
  secret: "CMPE272_passport",
  resave: false,
  saveUninitialized: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 6 * 1000,
  store: new mongoStore({
    url: dbConfig.url
  })
}));
app.use(passport.initialize());
app.use(passport.session());
var localStrategy = require("passport-local").Strategy;
passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
    kafka.make_request('requestTopic', "login", {username:email,password:password}, function(err,results){
        if(err){
            done(err,{});
        } else {
            if(results.code == 200){
                done(null,results.value);
            } else {
                done(null,false);
            }
        }
    });
}));*/

exports.donorLogin = function(req,res) {
    //passport.authenticate('local', function(err, user, info) {
        if(!req.body.email) {
            return res.status(400).send({message: 'Donor not found'});
        }
        DonorModel.findOne({email:req.body.email, password:req.body.password},(err, somedonor) => {
            if(err){
                res.status(500).send('Some error occurred while getting the donor');
            } else if(!somedonor){
                res.status(400).json('Donor not found');
            } else {
                res.status(200).send(somedonor);                
            }
        });
    //})(req, res);
};

exports.createDonor = function(req, res) {
    if(!req.body.firstName) {
        return res.status(400).send({message: "Donor name can not be empty"});
    }
    var donor = new Donor(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email, 
            phone: req.body.phone, 
            address: req.body.address,
            zip: req.body.zip, 
            password: req.body.password,
            userType: "Donor"
        }
    );
    donor.save().then(function(donor) {
        donor.message = "Donor successfully registred";
        res.send(donor);
    }).catch(function(err) {
        res.status(500).send({message: "Some error occurred while creating the Donor user."});
    });
};

exports.findAllDonor = function(req, res) {
    Donor.find(function(err, donors){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving donors info."});
        } else {
            res.send(donors);
        }
    });
};

exports.getDonorbyEmail = function(req,res) {
    DonorModel.find({email:req.params.email},(err, somedonor) => {
        if(err){
            res.status(500).send("Some error occurred while retrieving donors info.");
        }
        if(!somedonor){
            res.json("Donor not found");
        }
        res.json(somedonor[0]);
    });
};

//not in use
exports.updateDonorbyEmail = function(req,res) {
    DonorModel.findOneAndUpdate({email:req.params.email}, req.body, {new:true}, (err, somedonor) => {
        if(err){
            res.send(err);
        }
        res.json(somedonor);
    })
};