// connection.js
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

try {
  if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
      }
    );
  }

  // Test the connection
  sequelize.authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
} catch (error) {
  console.error('Error in establishing database connection:', error);
}

module.exports = sequelize;
