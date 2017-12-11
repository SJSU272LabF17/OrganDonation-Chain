var Donor = require('../models/Donor.js');
var request = require('request-promise');
var config = require('../config/database.config.js');
const blockchain = config.blockchain + "Donor";
var authenticate = require('./AuthController');

module.exports = function(passport) {
    var module = {};
    module.donorLogin = function(req,res) {
        passport.authenticate('local', function(err, user) {
            if(err) {
                return res.status(400).send({message: 'Donor not found'});
            }
            req.login(user._id, function(err){
                if(err) {
                    return res.status(400).send({message: 'Donor not found'});
                }
                res.status(200).send(user);
            });
        })(req, res);
    };

    /**
     * method used by signup page
     */
    module.createDonor = function(req, res) {
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
            donor.message = "Donor successfully registered";
            return donor;
        }).then(donor => {
            var donorCC = {
                "$class": "org.organchain.Donor",
                "donorId": donor._id.toString(),
                "firstName": donor.firstName,
                "lastName": donor.lastName,
                "ssn": "11",
                "age": donor.age,
                "email": donor.email,
                "address": donor.address,
                "zip": donor.zip
            };

            var options = {
                url : blockchain,
                headers : config.headers,
                body: JSON.stringify(donorCC)
            };

            return request.post(options).then(response => {
                let json = JSON.parse(response);
                res.send(donor);
            }).catch(err => {
                console.log("error in saving donor CC: " + err);
                throw err;
            });
        }).catch(function(err) {
            res.status(500).send({message: "Some error occurred while creating the Donor user. " + err})
        });
    };

    module.findAllDonor = function(req, res) {
        Donor.find(function(err, donors){
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving donors info."});
            } else {
                res.send(donors);
            }
        });
    };

    /**
     * used by donor profile page.
     */
    module.getDonorbyEmail = function(req,res) {
        Donor.find({email:req.params.email},(err, somedonor) => {
            if(err){
                res.status(500).send({message:"Some error occurred while retrieving donors info."});
            }
            if(!somedonor){
                res.send({message:"Donor not found"});
            }
            res.json(somedonor[0]);
        });
    };

    // //not in use
    // exports.updateDonorbyEmail = function(req,res) {
    //     Donor.findOneAndUpdate({email:req.params.email}, req.body, {new:true}, (err, somedonor) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(somedonor);
    //     })
    // };

    module.allLogout = function(req,res){
        req.session.destroy();
        res.status(200).send("successfully logged out!");
    }

    return module;
}