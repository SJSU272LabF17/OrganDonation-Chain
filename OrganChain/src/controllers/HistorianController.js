var request = require('request-promise');
var config = require('../config/database.config.js');
const blockchain = config.blockchain + "system/historian";
var sortJsonArray = require('sort-json-array');

exports.findAllHistorian = function(req, res) {

    request.get(blockchain).then(response => {
        var arr = JSON.parse(response);
        sortJsonArray(arr, 'transactionTimestamp', 'des');
        res.send(arr);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the RecipientInfo. " + err});
    });
};


exports.findByOrganId = function(req, res) {
    if (req.params.organId == null) {
        res.status(400).send({message: "no organId passed"});
    }
    request.get(blockchain).then(response => {
        var arr = JSON.parse(response);
        sortJsonArray(arr, 'transactionTimestamp', 'des');
        res.send(arr);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the RecipientInfo. " + err});
    });
};

exports.deleteAll = function(req, res) {

    var all = false;
    if(req.params.password == 'all') {
        all = true;
    }
    if (all || req.params.password == 'donor') {
        request.get(config.blockchain + "Donor")
            .then(response => {
                var arr = JSON.parse(response);
                arr.forEach(function (elem) {
                    request.delete(config.blockchain + "Donor/" + elem.donorId)
                        .then(res => {

                        }).catch(function (err) {
                        console.log('cannot delete donor');
                        });
                });
            }).catch(function (err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the RecipientInfo. " + err});
        });
    }

    if (all || req.params.password == 'hospital') {

        request.get(config.blockchain + "Hospital")
            .then(response => {
                var arr = JSON.parse(response);
                arr.forEach(function (elem) {
                    request.delete(config.blockchain + "Hospital/" + elem.hospitalId)
                        .then(res => {

                        }).catch(function (err) {
                        console.log('cannot delete Hospital');
                        });
                });
            });
    }

    if (all || req.params.password == 'recipient') {

        request.get(config.blockchain + "Recipient")
            .then(response => {
                var arr = JSON.parse(response);
                arr.forEach(function (elem) {
                    request.delete(config.blockchain + "Recipient/" + elem.recipientId)
                        .then(res => {

                        }).catch(function (err) {
                        console.log('cannot delete Recipient');
                        });
                });
            });
    }

    if (all || req.params.password == 'organ') {

        request.get(config.blockchain + "Organ")
            .then(response => {
                var arr = JSON.parse(response);
                arr.forEach(function (elem) {
                    request.delete(config.blockchain + "Organ/" + elem.organId)
                        .then(res => {

                        }).catch(function (err) {
                        console.log('cannot delete Organ');
                        });
                });
            });
    }
    res.send("done");
};


