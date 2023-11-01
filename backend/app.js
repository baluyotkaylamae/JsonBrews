const express = require('express');

const cookieParser = require('cookie-parser')
const cors = require('cors')
const categories = require('./routes/category');

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true }));
app.use(cookieParser());

app.use('/api', categories);


module.exports = app
