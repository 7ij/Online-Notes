const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const uri = "mongodb+srv://nayeem2021:iamarnayeem@cluster0.4ocfj1k.mongodb.net/?retryWrites=true&w=majority";
require('mongoose').connect(uri, { serverApi: { version: '1', strict: true, deprecationErrors: true } });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/login', require('./api/routes/login'));
app.use('/register', require('./api/routes/register'));
app.use('/notes', require('./api/routes/notes'));

module.exports = app;