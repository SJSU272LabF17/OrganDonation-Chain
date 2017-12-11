var isAuthenticate = require('../controllers/AuthController');
module.exports = function(app, passport) {
	var donor = require('../controllers/DonorController.js')(passport);
    app.post('/donor', donor.createDonor);
    app.post('/donor/login', donor.donorLogin);
    app.get('/donor/:email', isAuthenticate, donor.getDonorbyEmail);
    app.get('/donor', isAuthenticate, donor.findAllDonor);
    app.get('/logout', donor.allLogout);
    // app.put('/donor/:email', donor.updateDonorbyEmail);//not in use
};