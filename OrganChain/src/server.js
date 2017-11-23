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
app.listen(3001, function(){
    console.log("Server is listening on port 3001");
});