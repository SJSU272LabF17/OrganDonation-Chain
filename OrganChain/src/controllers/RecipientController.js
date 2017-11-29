var Recipient = require('../models/Recipient.js');

exports.create = function(req, res) {

    if(!req.body.name) {
        return res.status(400).send({message: "Recipient name can not be empty"});
    }
    console.log(req.body.name+"sfgb");
    var recipientInfo = new Recipient({name: req.body.name, age: req.body.age, organ: req.body.organ,
        hospital: req.body.hospital, email: req.body.email, address: req.body.address, phone: req.body.phone,
        status: req.body.status, testInfo: req.body.testInfo});
    var promise = recipientInfo.save();
    promise.then(function(recipient) {
        console.log("success");
        res.send(recipient);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the RecipientInfo."});
    });
};

exports.findAll = function(req, res) {
    Recipient.find(function(err, recipients){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving RecipientInfo."});
        } else {
            res.send(recipients);
        }
    });
}

