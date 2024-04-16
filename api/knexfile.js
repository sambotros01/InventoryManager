require('dotenv').config()

const connectionString = 'postgresql://postgres:docker@0.0.0.0:5432/inventory_db';

module.exports = {

    development: {
      client: "pg",
      connection: connectionString,
    },


  staging: {
    client: 'postgresql',
    connection: {
      database: 'inventory_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'inventory_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
