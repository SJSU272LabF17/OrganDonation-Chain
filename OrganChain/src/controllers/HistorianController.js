var request = require('request-promise');
var config = require('../config/database.config.js');
const blockchain = config.blockchain + "system/historian";
var sortJsonArray = require('sort-json-array');

exports.findAllHistorian = function(req, res) {

    request.get(blockchain).then(response => {
        var arr = JSON.parse(response);
        arr.forEach(function(elem) {
           console.log(elem);
        });
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
        arr.forEach(function(elem) {
            console.log(elem);
        });
        sortJsonArray(arr, 'transactionTimestamp', 'des');
        res.send(arr);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the RecipientInfo. " + err});
    });
};
