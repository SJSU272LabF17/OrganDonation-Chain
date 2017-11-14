var Donor = require('../models/Donor.js');

exports.createAndLogin = function(req, res) {

    if(!req.body.name) {
        return res.status(400).send({message: "Donor name can not be empty"});
    }
    var donor = new Donor({name: req.body.name, age: req.body.age, donorId: req.body.donorId,
        organName: req.body.organName, email: req.body.email, phone: req.body.phone, address: req.body.phone,
        password: req.body.password});
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

}

