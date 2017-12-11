var isAuthenticate = require('../controllers/AuthController');

module.exports = function(app, passport) {
	var hospital = require('../controllers/HospitalController.js')(passport);
    app.post('/hospital', hospital.create);
    app.post('/hospital/login', hospital.hospitalLogin);
    app.get('/hospital', isAuthenticate, hospital.findAll);
    app.get('/hospital/:zip', isAuthenticate, hospital.getHospitalsByZip);
    app.put('/hospital/:hospitalId', isAuthenticate, hospital.updateHospital);
};