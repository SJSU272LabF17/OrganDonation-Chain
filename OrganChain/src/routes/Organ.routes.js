module.exports = function(app) {

    var organ = require('../controllers/OrganController.js');

    // Create a new Donor
    app.post('/organ', organ.create);

    app.put('/organ/:organId', organ.update);

    app.get('/organ', organ.findAll);

};
