import {
    newHospital,
    getAllHospitals,
    updateHospitalByEmail
} from '../controllers/HospitalController'

var hospital = require('../controllers/HospitalController.js');

module.exports = function(app) {
    app.post('/hospital', hospital.create);
    app.post('/hospital/login', hospital.hospitalLogin);
    app.get('/hospital', hospital.findAll);
    app.route('/Uhospital').post(newHospital).get(getAllHospitals)
    app.get('/hospital/:zip', hospital.getHospitalsByZip);
    app.route('/Uhosptal/update/:email').put(updateHospitalByEmail)
};