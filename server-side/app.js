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
}));

let timeDifference = 60000 * (new Date).getTimezoneOffset();

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
				// console.log(res[0]);
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
	// console.log(animal);
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
	connection.query(`SELECT * FROM shows 
	WHERE host="${show.staff}" AND date_time="${show.date}"`, (err, res, fields) => {
		console.log(err, res);
		if (err || res.length != 0) {
			response.send({
				message: "This staff is already on the other show at this time"
			})
		} else {
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
		}
	})
});

app.post('/addNote', (req, res) => {
	let response = res;
	let a = req.body;
	connection.query(`INSERT INTO animal_care VALUES` 
	+ `("${a.name}", "${a.species}", "${a.staff}", "${a.date}", "${a.note}")`, 
	(err, res, fields) => {
		if (err) {
			response.send({
				message: "fail"
			})
		} else {
			response.send({
				message: "success"
			})
		}
	});
})

app.post('/animalNote', (req, res) => {
	let response = res;
	let a = req.body;
	
	let sort = req.body.sortCriteria;
	let sortQuery = "";
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				sortQuery += ` ORDER BY ${i} `;
				sortQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}

	connection.query(`SELECT staff_member, text_care, date_time FROM animal_care ` 
	+ `WHERE animal = "${a.name}" AND species = "${a.species}"` + sortQuery, (err, res, fields) => {
		console.log(err, res)
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			// console.log(res)
			response.send({
				message: "success",
				data: res
			})
		}
	}) 
})

app.post('/logVisit', (req, res) => {
	let response = res;
	let body = req.body;
	connection.query(`INSERT INTO visit_exhibit VALUES`
	+ ` ("${body.exhibit}", "${body.date}", "${body.visitor}")`, (err, res, fields) => {
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success"
			});
		}
	});
});

app.post('/logVisitShow', (req, res) => {
	let response = res;
	let visitor = req.body.data.username;
	let show_name = req.body.data.name;
	let date = new Date(req.body.data.date_time);
	date.setTime(date.getTime() - timeDifference);
	connection.query(`INSERT INTO visit_show VALUES (
		"${show_name}", "${date.toISOString()}", "${visitor}"
	)`, (err, res, fields) => {
		console.log(err, res);
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success"
			});
		}
	})
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
	
	let sort = req.body.sortCriteria;
	let sortQuery = "";
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				sortQuery += ` ORDER BY ${i} `;
				sortQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}

	connection.query(`SELECT e.name, e.size, e.water_feature, COUNT(*) numOfAnimals `
	+ `FROM exhibit e INNER JOIN animal a ON e.name = a.exhibit ` + searchQuery
	+ ` GROUP BY e.name HAVING numOfAnimals >= ${numMin} AND numOfAnimals <= ${numMax} ` + sortQuery, 
	(err, res, fields) => {
		// console.log(err, res);
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success",
				data: res
			});
		}
	});
});

app.post('/searchAnimal', (req, res) => {
	let response = res;
	let criteria = req.body.criteria;
	let data = req.body.data;
	let name = criteria.name ? data.name : "%";
	let exhibit = criteria.exhibit ? data.exhibit.name : "%";
	let species = criteria.species ? data.species : "%";
	let type = criteria.type ? data.type : "%";
	let ageMin = criteria.age ? data.ageMin : 0;
	let ageMax = criteria.age ? data.ageMax : 99999999;
	let searchQuery = ` WHERE name LIKE "${name}" AND exhibit LIKE "${exhibit}"`
		+ `AND species LIKE "${species}" AND type LIKE "${type}" AND age <= ${ageMax} AND age >= ${ageMin}`;
	
	let sort = req.body.sortCriteria;
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				searchQuery += ` ORDER BY ${i} `;
				searchQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}
	
	connection.query(`SELECT * FROM animal` + searchQuery, (err, res, fields) => {
		// console.log(err, res)
		response.send({
			message: "success",
			data: res
		});
	})
})

app.post('/searchShow', (req, res) => {
	// console.log(req.body)
	let response = res;
	let criteria = req.body.criteria;
	let data = req.body.data;
	let date = new Date(data.date);
	date.setTime(date.getTime() - timeDifference);
	let start = date;
	let end = new Date(date);
	end.setDate(end.getDate() + 1);

	let name = criteria.name ? data.name : "%";
	let exhibit = criteria.exhibit ? data.exhibit : "%";
	let host = criteria.host ? data.host : "%";
	let dateQuery = "";
	if (criteria.date) {
		start = start.toISOString();
		end = end.toISOString();
		dateQuery = ` date_time < "${end}" AND date_time >= "${start}"`;
	} else {
		dateQuery = ` date_time IS NOT NULL`;
	}

	let sort = req.body.sortCriteria;
	let sortQuery = ""
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				sortQuery += ` ORDER BY ${i} `;
				sortQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}
	// console.log(host);

	connection.query(`SELECT * FROM shows WHERE name LIKE "${name}" AND exhibit LIKE "${exhibit}" 
	AND host LIKE "${host}" AND` + dateQuery + sortQuery, (err, res, fields) => {
		// console.log(err, res);
		response.send({
			message: "success",
			data: res
		});
	});
});

app.post('/userSearch', (req, res) => {
	let response = res;
	let criteria = req.body.criteria;
	let data = req.body.data;
	let username = criteria.username ? data.username : "%";
	let email = criteria.email ? data.email : "%";
	let userType = data.userType;
	
	let sort = req.body.sortCriteria;
	let sortQuery = "";
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				sortQuery += ` ORDER BY ${i} `;
				sortQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}

	connection.query(`SELECT username, email FROM user
	WHERE username LIKE "${username}" AND email LIKE "${email}"
	AND user_type LIKE "${userType}"` + sortQuery, (err, res, fields) => {
		console.log(err, res);
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success",
				data: res
			});
		}
	});
});

app.post('/searchShowHistory', (req, res) => {
	let response = res;
	let criteria = req.body.criteria;
	let data = req.body.data;
	let username = data.username;
	let name = criteria.name ? data.name : "%";
	let exhibit = criteria.exhibit ? data.exhibit : "%";

	let date = new Date(data.date);
	date.setTime(date.getTime() - timeDifference);
	let start = date;
	let end = new Date(date);
	end.setDate(end.getDate() + 1);
	if (criteria.date) {
		start = start.toISOString();
		end = end.toISOString();
		dateQuery = ` s.date_time < "${end}" AND s.date_time >= "${start}"`;
	} else {
		dateQuery = ` s.date_time IS NOT NULL`;
	}

	let sort = req.body.sortCriteria;
	let sortQuery = "";
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				sortQuery += ` ORDER BY ${i} `;
				sortQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}

	connection.query(`SELECT DISTINCT s.name, s.date_time, s.exhibit 
	FROM visit_show vs JOIN shows s ON vs.show_name = s.name
	WHERE vs.visitor LIKE "${username}" AND s.name LIKE "${name}" 
	AND exhibit LIKE "${exhibit}" AND` + dateQuery + sortQuery, 
	(err, res, fields) => {
		// console.log(err, res);
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success",
				data: res
			})
		}
	})
})

app.post('/searchExhibitHistory', (req, res) => {
	let criteria = req.body.criteria;
	let data = req.body.data;
	let response = res;
	let name = criteria.name ? data.name : "%";
	let username = criteria.username ? data.username : "%";
	let numMin = criteria.numOfVisits ? data.numMin : 0;
	let numMax = criteria.numOfVisits ? data.numMax : 9999999;

	let date = new Date(data.date);
	date.setTime(date.getTime() - timeDifference);
	let start = date;
	let end = new Date(date);
	end.setDate(end.getDate() + 1);
	if (criteria.date) {
		start = start.toISOString();
		end = end.toISOString();
		dateQuery = ` a.date_time < "${end}" AND a.date_time >= "${start}"`;
	} else {
		dateQuery = ` a.date_time IS NOT NULL`;
	}

	let sort = req.body.sortCriteria;
	let sortQuery = "";
	if (sort) {
		for (var i of Object.keys(sort.criteria)) {
			if (sort.criteria[i]) {
				sortQuery += ` ORDER BY ${i} `;
				sortQuery += sort.ascending[i] ? ` ASC` : ` DESC`;
			}
		}
	}

	connection.query(`SELECT a.exhibit, a.date_time, numOfVisits `
	+ ` FROM visit_exhibit a, (
		SELECT exhibit, COUNT(*) AS numOfVisits
		FROM visit_exhibit
		GROUP BY exhibit
	) AS b WHERE a.exhibit = b.exhibit AND a.visitor LIKE "${username}" AND a.exhibit LIKE "${name}" AND` + dateQuery
	+ ` HAVING numOfVisits >= ${numMin} AND numOfVisits <= ${numMax} ` + sortQuery, 
	(err, res, fields) => {
		console.log(err, res);
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success",
				data: res
			});
		}
	});
});

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

app.post('/removeUser', (req, res) => {
	let response = res;
	let username = req.body.username;
	connection.query(`DELETE FROM user WHERE username = "${username}"`,
	(err, res, fields) => {
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success"
			})
		}
	});
});

app.post('/removeShow', (req, res) => {
	let response = res;
	let name = req.body.name;
	let date_time = new Date(req.body.date_time);
	date_time.setTime(date_time.getTime() - 60000 * date_time.getTimezoneOffset());
	let date = date_time.toISOString();
	date = date.substring(0, date.length - 1);
	// console.log(name, date);
	connection.query(`DELETE FROM shows
	WHERE name="${name}" AND date_time="${date}"`, 
	(err, res, fields) => {
		console.log(err, res);
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success"
			});
		}
	});
});

app.post('/removeAnimal', (req, res) => {
	let response = res;
	let name = req.body.name;
	let species = req.body.species;
	connection.query(`DELETE FROM animal 
	WHERE name="${name}" AND species="${species}"`, 
	(err, res, fields) => {
		if (err) {
			response.send({
				message: "fail"
			});
		} else {
			response.send({
				message: "success"
			});
		}
	})
})

app.get('/api/data', (req, res) => {
	console.log(req.session.user)
	res.json(req.session)
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Listening to port: " + process.env.PORT);
});