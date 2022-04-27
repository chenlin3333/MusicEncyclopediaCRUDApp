require('dotenv').config();
var promise = require('bluebird');
var pg = require('pg');

const options = {
    // Initialization Options
    promiseLib: promise,
    connect(client, dc, useCount) {
      const cp = client.connectionParameters;
      console.log('Connected to database:', cp.database);
    }
};
const pgp = require('pg-promise')(options);
var connectionString = `postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`;
const db = pgp(connectionString);

module.exports = {
    pgp, db
};
