module.exports = function(app) {

    var organ = require('../controllers/OrganController.js');

    // Create a new Donor
    app.post('/organ', organ.create);

    app.get('/organ', organ.findAll);

};
