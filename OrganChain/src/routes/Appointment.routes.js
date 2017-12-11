module.exports = function(app) {
    var appointment = require('../controllers/AppointmentController.js');
    app.post('/appointment/donor', appointment.create);
    app.post('/appointment/unos', appointment.createUnosAppointment);
    app.get('/appointment/testing/hospital/:hospitalId', appointment.scheduledTestingAppts);
    app.get('/appointment/testing/:donorId', appointment.getAllAppts);
    app.get('/appointment/transplant/hospital/:hospitalId', appointment.scheduledTransplantAppts);
    app.post('/appointment/complete', appointment.completeTransplant);
};