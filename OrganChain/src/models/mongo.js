var mongoose = require("mongoose");
var dbConfig = require('../config/database.config.js');
var mongo = mongoose.connect(dbConfig.url, { useMongoClient: true });
mongo.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongo.once('open', function() {
    console.log("Successfully connected to the database");
})

module.exports = mongo;