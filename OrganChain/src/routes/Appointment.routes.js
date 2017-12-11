var isAuthenticate = require('../controllers/AuthController');
module.exports = function(app) {
    var appointment = require('../controllers/AppointmentController.js');
    app.post('/appointment/donor', isAuthenticate, appointment.create);
    app.post('/appointment/unos', appointment.createUnosAppointment);
    app.get('/appointment/testing/hospital/:hospitalId', isAuthenticate, appointment.scheduledTestingAppts);
    app.get('/appointment/testing/:donorId', isAuthenticate, appointment.getAllAppts);
    app.get('/appointment/transplant/hospital/:hospitalId', isAuthenticate, appointment.scheduledTransplantAppts);
    app.post('/appointment/complete', isAuthenticate, appointment.completeTransplant);
    app.get('/appointment/testing', appointment.scheduledAllTestingAppts);
};