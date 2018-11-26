const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();


const connection = require('./db_Connection.js')
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send({
		"name": "Tuan"
	})
})

// Make db connection NO NEED AT ALL
connection.connect((err) => {
	if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
	console.log('Connected as id ' + connection.threadId);
})


// Sample query call, this auto make connect to database
connection.query('SELECT * FROM user',(err, res, fields) => {

	// Fields here will contail all the information of each attributes in the table
	// For example it will tell the length, type, nameType, flags.

	if (err) {
		throw err;
	}
	res.forEach(res => {
		console.log(res)
	})
	console.log("username: " + res[0].username) // Res here as an array of objects

	/** Sample query
	[ RowDataPacket {
		    username: 'tnntech',
		    password: '*5B5EA45DDADC701A33A',
		    email: 'tnntech@gatech.edu',
		    user_type: 'Visitor'
	    }
    ]
	*/
})

// Close database connection
connection.end();

app.listen(process.env.PORT || 8000, () => {
	console.log("Listening to port: " + process.env.PORT);
});