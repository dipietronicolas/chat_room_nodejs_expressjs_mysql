const mysql = require('mysql');

module.exports = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'chat_database'
  })
}