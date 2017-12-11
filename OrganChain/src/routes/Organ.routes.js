var isAuthenticate = require('../controllers/AuthController');
module.exports = function(app) {
    var organ = require('../controllers/OrganController.js');
    app.post('/organ', isAuthenticate, organ.createOrgan);
    app.put('/organ/:organId', isAuthenticate, organ.update);
    app.get('/organ', isAuthenticate, organ.findAll);
    app.get('/organ/:donorId', isAuthenticate, organ.findAllUserOrgans);
};