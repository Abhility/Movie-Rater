const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./Routes/api');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(api);


app.listen(PORT,() => {
    console.log('Server running on port '+ PORT);
})