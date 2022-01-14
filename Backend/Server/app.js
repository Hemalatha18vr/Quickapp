'use strict';


module.exports = function (app) {
    //Initialize models
    let userModel = require('./models/stock');
   
    //Initialize routes for app.js
    let mainroute = require('./routes/route');
    mainroute(app);
};