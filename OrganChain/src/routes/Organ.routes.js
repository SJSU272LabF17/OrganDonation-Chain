module.exports = function(app) {
    var organ = require('../controllers/OrganController.js');
    // Create a new Donor
    app.post('/organ', organ.createOrgan);
    app.put('/organ/:organId', organ.update);
    app.get('/organ', organ.findAll);
    // app.route('/organU/:email').get(organ.getOrganByEmail).post(organ.organCreate);
};