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

