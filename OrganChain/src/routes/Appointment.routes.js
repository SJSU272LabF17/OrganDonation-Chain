module.exports = function(app) {
    var appointment = require('../controllers/AppointmentController.js');
    app.post('/appointment', appointment.create);
    app.get('/appointment', appointment.scheduledHospitalAppts);
    // app.route('/appointment/:email').get(appointment.getAppointmentByEmail).post(appointment.createTestingAppointment);
};