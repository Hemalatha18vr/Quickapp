/**
 * Controller for stock endpoints.
 */

'use strict';
//import stock service.
const stockService = require('../services/stock-service');
/**
 * Returns a list of entity in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (stocks) => {
        response.status(200);
        response.json(stocks);
    };
    stockService.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new stock with the request JSON and
 * returns stock JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    console.log(request.body);
    
     const val={ companyName: request.body.companyName , symbol: request.body.symbol, marketCap: request.body.marketCap, CurrentPrice: request.body.CurrentPrice};

    const newstock = Object.assign({},val);
    const resolve = (stock) => {
        response.status(200);
        response.json(stock);
    };
    stockService.save(newstock)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a entity object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    const resolve = (stock) => {
        response.status(200);
        response.json(stock);
    };
    stockService.get(request.params.stockId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a stock object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const stock = Object.assign({}, request.body);
    const resolve = (stock) => {
        response.status(200);
        response.json({
            message: 'stock Successfully updated' + stock
        });
    };
    stock._id = request.params.stockId;
    stockService.update(stock)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a stock object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (stock) => {
        response.status(200);
        response.json({
            message: 'stock Successfully deleted'
        });
    };
    stockService.delete(request.params.stockId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};



//Register stock
exports.register = function (req, res) {
    stockService.create(req.body)
        .then(function () {
            console.log("Here");
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//Get All stocks
exports.getAll = function (req, res) {
    stockService.getAll()
        .then(function (stocks) {
            res.send(stocks);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//get Current stock
exports.getCurrent = function (req, res) {
    stockService.getById(req.stock.sub)
        .then(function (stock) {
            if (stock) {
                res.send(stock);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};