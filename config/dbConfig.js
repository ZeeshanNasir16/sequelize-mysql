/**
 * Import Sequelize.
 */
const Sequelize = require('sequelize');

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
// ^ Sequelize(database,username,password,{options})
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql',
  }
);

/**
 * Export the Sequelize instance. This instance can now be
 * used in the app.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;
