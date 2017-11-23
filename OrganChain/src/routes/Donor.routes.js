var donor = require('../controllers/DonorController.js');

module.exports = function(app) {
    app.post('/donor', donor.createDonor);
    app.post('/donor/login', donor.donorLogin);
    app.get('/donor/:email', donor.getDonorbyEmail);
    app.get('/donor', donor.findAllDonor);    
    app.put('/donor/:email', donor.updateDonorbyEmail);//not in use
};