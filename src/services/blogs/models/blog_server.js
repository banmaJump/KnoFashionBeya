const mysql = require('mysql');
require('dotenv').config(); // 環境変数を読み込む

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting:', error);
    return;
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection;
