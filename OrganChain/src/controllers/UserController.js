var User = require('../models/User.js');

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body.content) {
        return res.status(400).send({message: "Note can not be empty"});
    }
    var note = new User({title: req.body.title || "Untitled Note", content: req.body.content});

    var promise = note.save();
    promise.then(function(user) {
        console.log("success");
        res.send(user);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the Note."});
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    User.find(function(err, notes){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(notes);
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single note with a noteId

};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request

};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request

};

