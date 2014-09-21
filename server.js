
/**
 * Module dependencies
 */

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

// Bootstrap models
require('./config/orm');

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);
