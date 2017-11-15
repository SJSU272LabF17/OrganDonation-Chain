module.exports = function(app) {

    var recipient = require('../controllers/RecipientController.js');
    app.post('/recipient', recipient.create);
    app.get('/recipient', recipient.findAll);

};
