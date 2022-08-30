require('dotenv').config();


module.exports = {
  SECRET_KEY:"secret1122",
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect:'postgres',
    define: {
      timestamps: true
    }
  }
}
