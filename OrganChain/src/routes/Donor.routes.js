module.exports = function(app) {

    var donor = require('../controllers/DonorController.js');

    // Create a new Donor
    app.post('/donor', donor.create);

    app.get('/donor', donor.findAll);

    // app.get('/donor/:donorId', donor.findOne);

}
