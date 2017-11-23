module.exports = function(app) {
  var passport = require('passport');
  var localStrategy = require("passport-local").Strategy;
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      done(null, user);
  });
  passport.use('local', new localStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function(email, password, done) {
        kafka.make_request('requestTopic', "login", {username:email,password:password}, function(err,results){
            if(err){
                done(err,{});
            } else {
                if(results.code == 200){
                    done(null,results.value);
                } else {
                    done(null,false);
                }
            }
        });
  }));
};