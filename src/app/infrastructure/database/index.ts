import knex from 'knex';

const env = process.env.NODE_ENV || 'development';

const config = ((env: string): string => {
  const configFile = require('../../../../knexfile');

  if (env === 'test') {
    return configFile.test;
  } else if (env === 'development') {
    return configFile.development;
  } else if (env === 'production') {
    return configFile.production;
  }

  throw new Error(`Knexfile does not support ${env} environment.`);
})(env);

const db = knex(config);

export default db;
