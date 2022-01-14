'use strict';
module.exports = function (app) {

    
    const stockController = require('../controllers/stock-controller');
    // stock Routes for search and create.
    app.route('/stocks')
        .get(stockController.list)
        .post(stockController.post);

    // stock Routes for get, update and delete.
    app.route('/stocks/:stockId')
        .get(stockController.get)
        .put(stockController.put)
        .delete(stockController.delete);

        

};