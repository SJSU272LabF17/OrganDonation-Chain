var historian = require('../controllers/HistorianController.js');
var isAuthenticate = require('../controllers/AuthController');
module.exports = function(app) {
    app.get('/historian', historian.findAllHistorian);
    app.get('/historian/:organId', isAuthenticate, historian.findByOrganId);
    app.get('/historian/deleteAll/:password', historian.deleteAll);
};