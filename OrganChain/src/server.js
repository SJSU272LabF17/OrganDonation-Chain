var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// create express app
var app = express();
var router = express.Router();
var db = require("./models/mongo.js");

mongoose.Promise = global.Promise;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cookieParser());

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

app.use('/',router);


require('./routes/user.routes.js')(app);
require('./routes/Donor.routes.js')(app);
require('./routes/Hospital.routes.js')(app);
require('./routes/Organ.routes.js')(app);
require('./routes/Appointment.routes.js')(app);
require('./routes/Recipient.routes.js')(app);

// listen for requests
app.listen(3001, function(){
    console.log("Server is listening on port 3001");
});

