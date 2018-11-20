const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.listen(process.env.PORT || 8000, () => {

});

app.get('/', (req, res) => {
	res.send({
		"name": "Tuan"
	})
})