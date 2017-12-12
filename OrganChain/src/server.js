var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');

// create express app
var app = express();
var router = express.Router();
var db = require("./models/mongo.js");
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo")(expressSessions);
var cors = require('cors');
var passport = require('passport');
require('./controllers/passportLogin')(passport);
var localStrategy = require("passport-local").Strategy;

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

app.use('/',router);
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());


app.use(expressSessions({
  secret: "CMPE272_passport",
  resave: false,
  saveUninitialized: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 6 * 1000,
  store: new mongoStore({
    url: dbConfig.url
  })
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/Donor.routes.js')(app, passport);
require('./routes/Hospital.routes.js')(app, passport);
require('./routes/Organ.routes.js')(app);
require('./routes/Appointment.routes.js')(app);
require('./routes/Recipient.routes.js')(app);
require('./routes/Historian.routes.js')(app);
var request = require('request-promise');
var config = require('./config/database.config.js');
const blockchain = config.blockchain + "Unos";

var unosCC = {
    "$class": "org.organchain.Unos",
    "unosId": "99999999"
};

var options = {
    url : blockchain,
    headers : config.headers,
    body: JSON.stringify(unosCC)
};
request.get(blockchain).then(response => {
    let arr = JSON.parse(response);
    if (arr && arr.length == 0) {
        request.post(options).then(responsePost => {
            let json = JSON.parse(responsePost);
            app.listen(3001, function(){
                console.log("Server is listening on port 3001");
            });
        }).catch(err => {
            console.log("error in saving Unos CC: " + err);
            throw err;
        });
    } else {
        app.listen(3001, function(){
            console.log("Server is listening on port 3001");
        });
    }
}).catch(err => {
    console.log("error in access unos CC: " + err);
    throw err;
});

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
