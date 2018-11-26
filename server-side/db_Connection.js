require('dotenv').config();
const mysql = require('mysql');

module.exports = mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_TABLE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});