/**
 * Service for stock operations.
 */

 'use strict';
 const mongoose = require('mongoose'),
     STOCK = mongoose.model('stocks');
 
 /**
  * Returns an array of stock object matching the search parameters.
  *
  * @param {Object} params {Search parameters}
  */
 
 exports.search = function (params) {
     const promise = STOCK.find({}).exec();
     return promise;
 };
 
 /**
  * Saves and returns the new stock object.
  *
  * @param {Object} stock {stock object}
  */
 exports.save = function (stock) {
     const newstock = new STOCK({companyName: stock.companyName , symbol: stock.symbol, marketCap: stock.marketCap, CurrentPrice: stock.CurrentPrice}); 
     const promise = newstock.save();
     return promise;
 };
 
 /**
  * Returns the stock object matching the id.
  *
  * @param {string} stockId {Id of the stock object}
  */
 exports.get = function (stockId) {
     const promise = STOCK.findById(stockId).exec();
     return promise
    
 };
 
 /**
  * Updates and returns the stock object.
  *
  * @param {Object} stock {stock object}
  */
 exports.update = function (stock) {
     stock.modified_date = new Date();
     const promise = STOCK.findOneAndUpdate({_id: stock._id}, stock,{new: true}).exec();
     return promise;
 };
 
 /**
  * Deletes the  object matching the id.
  *
  * @param {string} stockId {Id of the stock object}
  */
 exports.delete = function (stockId) {
     const promise = STOCK.remove({_id: stockId});
     return promise;
 };
 
 exports.searchstock = function (params) {
     const promise = STOCK.find(params).exec();
     return promise;
 };