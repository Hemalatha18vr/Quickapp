'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for entity object.
 */
let stockSchema = new Schema({
    /**
     * Title of the todo.
     */
    companyName: {
        type: String
    },
    symbol: {
        type: String
    },
    marketCap: {
        type: String
    },
    CurrentPrice: {
        type: String
    }
}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
stockSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
stockSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('stocks', stockSchema);
