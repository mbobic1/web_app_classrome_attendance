const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/public/html'));
app.use('/', express.static(__dirname + '/public/css'));
app.use('/', express.static(__dirname + '/public/icone'));
app.use('/', express.static(__dirname + '/public/scripts'));
app.listen(3000);