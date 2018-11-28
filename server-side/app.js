const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session')
const helper = require('../server-side/helpers/crypto');
require('dotenv').config();

app.use(session({
	secret: 'vfsddasdas1234444444242423423asdasdadadada',
	saveUninitialized: false,
	resave: false
}))


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
		if (res && res.length != 0) {
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
			response.send({
				"message": "Wrong username or password"
			});
		} else {
			if (res && res.length != 0) {
				delete res[0]["password"];
				response.send({
					"message": "success",
					"data": res[0]
				});
				req.session.user = account.email; // Add to session
				req.session.save()
			} else {
				response.send({
					"message": "Wrong username or password"
				});
			}
		}
	});
});

app.post('/addAnimal', (req, res) => {
	let animal = req.body;
	let response = res;
	console.log(animal);
	connection.query(`INSERT INTO animal VALUES` +
		`("${animal.name}", "${animal.specie}", "${animal.type}", "${animal.age}", "${animal.exhibit}")`,
		(err, res, fields) => {
			if (err) {
				response.send({
					"message": "Combination of Name and Specie is already in the database"
				});
			} else {
				if (!animal.age || animal.age == '') {
					connection.query(`UPDATE animal SET age = NULL WHERE name="${animal.name}" AND species="${animal.specie}"`);
				}
				if (!animal.type || animal.type == '') {
					connection.query(`UPDATE animal SET type = NULL WHERE name="${animal.name}" AND species="${animal.specie}"`);
				}
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

app.post('/searchExhibit', (req, res) => {
	let response = res;
	let criteria = req.body.criteria;
	let data = req.body.data;
	let name = criteria.name ? data.name : "%";
	let numMin = criteria.numOfAnimals ? data.numMin : 0;
	let numMax = criteria.numOfAnimals ? data.numMax : 99999999;
	let sizeMin = criteria.size ? data.sizeMin : 0;
	let sizeMax = criteria.size ? data.sizeMax : 99999999;
	let water_feature = criteria.water_feature ? data.water_feature : " NOT NULL";
	let searchQuery = `WHERE e.name LIKE "${name}" AND e.size >= ${sizeMin} AND e.size <= ${sizeMax} AND e.water_feature IS ${water_feature} `;
	console.log(searchQuery);
	connection.query(`SELECT e.name, e.size, e.water_feature, COUNT(*) numOfAnimals `
	+ `FROM exhibit e INNER JOIN animal a ON e.name = a.exhibit ` + searchQuery
	+ ` GROUP BY e.name HAVING numOfAnimals >= ${numMin} AND numOfAnimals <= ${numMax}`, 
	(err, res, fields) => {
		console.log(err);
		response.send({
			"message": "success",
			"data": res
		});
	});
});

// Need work on Query - not finish yet.
app.post('/searchAnimal', (req, res) => {
	let response = res;
	let criteria = req.body.criteria;
	let data = req.body.data;
	let name = criteria.name ? data.name : "%";
	let exhibit = criteria.exhibit ? data.exhibit : "%";
	let species = criteria.species ? data.species : "%";
	let type = criteria.type ? data.type : "%";
	let ageMin = criteria.age ? data.ageMin : 0;
	let ageMax = criteria.age ? data.ageMax : 99999999;
	let searchQuery = ` WHERE name LIKE "${name}" AND exhibit LIKE "${exhibit}"`
		+ `AND species LIKE "${species}" AND type LIKE "${type}" AND age <= ${ageMax} AND age >= ${ageMin}`;
	connection.query(`SELECT * FROM animal` + searchQuery, (err, res, fields) => {
		console.log(err, res)
		response.send({
			message: "success",
			data: res
		});
	})
})

app.post('/animalByExhibit', (req, res) => {
	let exhibit = req.body;
	let response = res;
	connection.query(`SELECT * FROM animal WHERE exhibit="${exhibit.name}"`,
	(err, res, fields) => {
		response.send({
			"messsage": "success",
			"data": res
		})
	})
});

app.get('/api/data', (req, res) => {
	console.log(req.session.user)
	res.json(req.session)
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Listening to port: " + process.env.PORT);
});