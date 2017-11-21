import {
    getdonorbyEmail,
    addDonorbyEmail,
    UpdateDonorbyEmail,
    DeleteDonorbyEmail
} from '../controllers/DonorController'
module.exports = function(app) {

    var donor = require('../controllers/DonorController.js');

    app.route("/")
        .get()
        .delete()
        .post()
    // Create a new Donor
    app.post('/donor', donor.create);

    app.get('/donor', donor.findAll);

    app.route('/donorU/:email')
        .get(getdonorbyEmail)
        .post(addDonorbyEmail)
        .put(UpdateDonorbyEmail)
    // app.get('/donor/:donorId', donor.findOne);

};
