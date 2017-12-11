var isAuthenticate = require('../controllers/AuthController');
module.exports = function(app) {
    var recipient = require('../controllers/RecipientController.js');
    app.post('/recipient', isAuthenticate, recipient.create);
    app.get('/recipient', recipient.findAll);
};