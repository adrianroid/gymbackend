'use strict';
const mongoose = require('mongoose');
const db = mongoose.connection;

const MONGO = {
    db: null,
    init: function ()  {
        mongoose.connect(`mongodb+srv://admin:admin123@cluster0.tbg3m.mongodb.net/polosgym?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true});
        db.on('error', console.error.bind(console, 'Error connecting to mongodb: '));
        db.once('open', console.log.bind(console, 'Mongo Database Connected.'));
        this.db = db;
        return this;
    },
    getDB: function() {
        return db;
    }
};

module.exports = MONGO.init();
