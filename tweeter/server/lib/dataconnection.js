'use strict';

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {

  connect: (callback) => {
    console.log(`Connecting to mongodb @ ${MONGODB_URI}`);

    MongoClient.connect(MONGODB_URI, (err, db) => {
      if (err) throw err;
      console.log('Successfully connected to DB: ' + MONGODB_URI);
      callback(db, () => { db.close(); });
    });
  }
};