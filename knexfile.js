require('ts-node/register');

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_NAME,
      port: process.env.TEST_DB_PORT
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB_NAME
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
