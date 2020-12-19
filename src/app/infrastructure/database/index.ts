import knex from 'knex';

const env = process.env.NODE_ENV || 'development';
const config = require('../../../../knexfile')[env]; //TODO: use join

const db = knex(config);

export default db;

// TODO: export queries, insted of db and make validation of database connection.
