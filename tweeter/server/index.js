'use strict';
require('dotenv').config();
// Basic express setup:

const PORT          = 8080;
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./lib/dataconnection').connect( (db) => {
  const DataHelpers = require('./lib/data-helper.js')(db);
  const tweetsRoutes = require('./routes/tweets')(DataHelpers);
  app.use('/tweets', tweetsRoutes);
});

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

// Mount the tweets routes at the "/tweets" path prefix:

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});