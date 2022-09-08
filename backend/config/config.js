module.exports = {
  SECRET_KEY:"secret1122",
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDB,
    host: process.env.PGHOST,
    dialect:'postgres',
    define: {
      timestamps: true
    }
  }
}
