var express = require('express');
var router = require('./routes.js');
var app = express();
router.SetRoutes(app);
app.listen(1000);
