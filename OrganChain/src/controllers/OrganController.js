var Organ = require('../models/Organ.js');

exports.create = function(req, res) {

    var organ = new Organ({name: req.body.name, donorId: req.body.donorID, organTestInfo: req.body.organTestInfo,
        sourceHospital: req.body.sourceHospital, targetHospital: req.body.targetHospital});
    var promise = organ.save();
    promise.then(function(organ) {
        res.send(organ);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the organ."});
    });
};

exports.findAll = function(req, res) {
    Organ.find(function(err, organs){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving organs info."});
        } else {
            res.send(organs);
        }
    });
}

