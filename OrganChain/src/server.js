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
app.use(cors(corsOptions));

require('./routes/Donor.routes.js')(app);
require('./routes/Hospital.routes.js')(app);
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
