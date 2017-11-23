var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken.js');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('./config.js'); // get config file

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Donor = require('../../models/Donor.js');

/**
 * Configure JWT
 */

exports.login = function(req, res) {
    // Retrieve and return all notes from the database.
    User.find({email:req.params.email}, function(err, notes){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(notes);
        }
    });
};

router.post('/login', function(req, res) {

    if (req.body.userType == "donor") {
        Donor.findOne({ email: req.body.email }, function (err, donor) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');

            // check if the password is valid
            var passwordIsValid = bcrypt.compareSync(req.body.password, donor.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id: donor._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            res.status(200).send({ auth: true, token: token });
        });
    }
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Donor.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        },
        function (err, donor) {
            if (err) return res.status(500).send("There was a problem registering the donor.");

            // if user is registered without errors
            // create a token
            var token = jwt.sign({ id: donor._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });

});

router.get('/me', VerifyToken, function(req, res, next) {

    Donor.findOne(req.donorId, { password: 0 }, function (err, donor) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!donor) return res.status(404).send("No user found.");
        res.status(200).send(donor);
    });

});

module.exports = router;
