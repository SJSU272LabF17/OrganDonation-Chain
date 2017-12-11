var localStrategy = require("passport-local").Strategy;
var Donor = require('../models/Donor.js');
var request = require('request-promise');
var Hospital = require('../models/Hospital.js');

module.exports = function(passport) {
  passport.use('local', new localStrategy({
      usernameField: 'email',
      passwordField: 'password', 
      passReqToCallback: true
    }, function(req, email, password, done) {
      if (req.body.userType == "Donor") {
         Donor.findOne({email:email, password:password},(err, somedonor) => {
            if(err){
              done(null, false);
            } else if(!somedonor){
              done(null, false);
            } else {
              done(null, somedonor);
            }
        });
      } else if(req.body.userType == "Hospital"){
        Hospital.findOne({email:email, password:password},(err, someHospital) => {
            if(err){
              done(null, false);
            } else if(!someHospital){
              done(null, false);
            } else{
              done(null, someHospital);
            }
        });
      }
  }));
};