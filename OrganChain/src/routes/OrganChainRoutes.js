import {} from '../controllers/OrganChainControllers';
const routes = (app) => {
    app.route('/donor');
    app.route('/donor/:email');
    app.route('/appointment');
    app.route('/appointment/:userId');
    app.route('/organ');
    app.route('/organ/:donorId');
    app.route('/organ/:organId');
}