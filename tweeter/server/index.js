'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.set('views', 'public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

db.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(dbInstance));
});

app.get('/', function(req, res){
  res.render('index.html');
});
app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
