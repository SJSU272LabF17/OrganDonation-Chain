var Recipient = require('../models/Recipient.js');
var request = require('request-promise');
var config = require('../config/database.config.js');
const blockchain = config.blockchain + "Recipient";

exports.create = function(req, res) {

    if(!req.body.name) {
        return res.status(400).send({message: "Recipient name can not be empty"});
    }
    var sql = Recipient.find().where('name').equals(req.body.name)
        .exec(function(err, recs) {
            if (err) {
                var recipientInfo = new Recipient({name: req.body.name, age: req.body.age, organ: req.body.organ,
                    hospital: req.body.hospital, email: req.body.email, address: req.body.address, phone: req.body.phone,
                    status: req.body.status, testInfo: req.body.testInfo});
                recipientInfo.save().then(function(recipient) {
                    return recipient;
                }).then(recipient => {
                    var recipientCC = {
                        "$class": "org.organchain.Recipient",
                        "recipientId": recipient._id.toString(),
                        "name": recipient.name,
                        "age": recipient.age,
                        "hospital": recipient.hospital.toString(),
                        "email": recipient.email,
                        "organName": recipient.organ,
                        "address": JSON.stringify(recipient.address)
                    };
            
                    var options = {
                        url : blockchain,
                        headers : config.headers,
                        body: JSON.stringify(recipientCC)
                    };
            
                    return request.post(options).then(response => {
                        let json = JSON.parse(response);
                        res.send(recipient);
                    }).catch(err => {
                        console.log("error in saving recipient CC: " + err);
                        throw err;
                    });
                }).catch(function(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while creating the RecipientInfo. " + err});
                });
            } else {
                res.status(400).send({message: "already registered recipient"});
            }
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

