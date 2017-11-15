import {
    getHospitalsByZip,
    newHospital,
    getAllHospitals,
    updateHospitalByEmail
} from '../controllers/HospitalController'
module.exports = function(app) {

    var hospital = require('../controllers/HospitalController.js');

    // Create a new Donor
    app.post('/hospital', hospital.create);
    app.get('/hospital', hospital.findAll);
    app.route('/Uhospital')
    .post(newHospital)
    .get(getAllHospitals)
    app.route('/Uhospital/:zip')
    .get(getHospitalsByZip)
    app.route('/Uhosptal/update/:email')
    .put(updateHospitalByEmail)
    

};
