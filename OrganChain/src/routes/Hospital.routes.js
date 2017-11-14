module.exports = function(app) {

    var hospital = require('../controllers/HospitalController.js');

    // Create a new Donor
    app.post('/hospital', hospital.create);

    app.get('/hospital', hospital.findAll);

};
