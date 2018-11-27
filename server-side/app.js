const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helper = require('../server-side/helpers/crypto');
require('dotenv').config();


const connection = require('./db_Connection.js')
app.use(bodyParser.json());
app.use(cors());

app.get('/exhibitList', (req, res) => {
	let response = res;
	connection.query("SELECT name FROM exhibit", (err, res, fields) => {
		response.send({
			"message": "success",
			"data": res
		});
	});
});

app.get('/staffList', (req, res) => {
	let response = res;
	connection.query("SELECT username FROM staff", (err, res, fields) => {
		response.send({
			"message": "success",
			"data": res
		});
	});
});

app.post('/register', (req, res) => {
	let response = res;
	let account = req.body;
	account.password = helper.encrypt(account.password);
	connection.query(`SELECT * FROM user WHERE username = "${account.username}" OR email = "${account.email}"`, (err, res, fields) => {
		// If user already exists
		if (res.length != 0) {
			response.send({
				"message": "Username or Email already exists!"
			});

		} else {

			// Create new User
			connection.query(`INSERT INTO user VALUES ("${account.username}", "${account.password}", "${account.email}", "${account.type}")`);
			connection.query(`INSERT INTO ${account.type.toLowerCase()} VALUES ("${account.username}")`);
			response.send({
				"message": "success"
			});
		}
	});
});

app.post('/login', (req, res) => {
	let response = res;
	let account = req.body;
	account.password = helper.encrypt(account.password);
	connection.query(`SELECT * FROM user WHERE email = "${account.email}"` 
			+ `AND password = "${account.password}"`, (err, res, fields) => {
		if (err) {
			throw err
		}
		if (res.length != 0) {
			delete res[0]["password"];
			response.send({
				"message": "success",
				"data": res[0]
			});
		} else {
			response.send({
				"message": "fail"
			});
		}
	});
});

app.post('/addAnimal', (req, res) => {
	let animal = req.body;
	let response = res;
	connection.query(`INSERT INTO animal VALUES` + 
		`("${animal.name}", "${animal.specie}", "${animal.type}", "${animal.age}", "${animal.exhibit}")`,
		(err, res, fields) => {
			if (err) {
				response.send({
					"message": "Combination of Name and Specie is already in the database"
				});
			} else {
				response.send({
					"message": "success"
				})
			}
		});
});

app.post('/addShow', (req, res) => {
	let show = req.body;
	let response = res;
	connection.query(`INSERT INTO shows VALUES` + 
		`("${show.name}", "${show.date}", "${show.staff}", "${show.exhibit}")`,
		(err, res, fields) => {
			if (err) {
				response.send({
					"message": "Constraint, look in documentation"
				});
			} else {
				response.send({
					"message": "success"
				})
			}
		});
});

app.listen(process.env.PORT || 5000, () => {
	console.log("Listening to port: " + process.env.PORT);  
});