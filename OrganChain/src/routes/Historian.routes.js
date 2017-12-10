var historian = require('../controllers/HistorianController.js');

module.exports = function(app) {
    app.get('/historian', historian.findAllHistorian);
    app.get('/historian/:organId', historian.findByOrganId);
};