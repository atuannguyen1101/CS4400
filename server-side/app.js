const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helper = require('../server-side/helpers/crypto');
require('dotenv').config();


const connection = require('./db_Connection.js')
app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
	let response = res;
	let account = req.body;
	account.password = helper.encrypt(account.password);
	connection.query(`SELECT * FROM user WHERE username = "${account.username}"`, (err, res, fields) => {
		// If user already exists
		if (res.length != 0) {
			response.send({
				"message": "fail"
			});

		} else {

			// Create new User
			connection.query(`INSERT INTO user VALUES ("${account.username}", "${account.password}", "${account.email}", "${account.type}")`);
			response.send({
				"message": "success"
			})
		}
	})
});

app.post('/addAnimal', (req, res) => {
	console.log(req.body);
	res.send({
		"message": "received"
	});
})

app.post('/addShow', (req, res) => {
	let response = res;
	connection.query('SELECT * FROM user',(err, res, fields) => {

		// Fields here will contail all the information of each attributes in the table
		// For example it will tell the length, type, nameType, flags.
	
		if (err) {
			throw err;
		}
		res.forEach(res => {
			console.log(res);
		})
		console.log("username: " + res[0].username);

		response.send({
			"message": "received"
		});

		// Close database connection
		connection.end();
	});
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Listening to port: " + process.env.PORT);
});