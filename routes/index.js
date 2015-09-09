var express = require('express');
var router  = express.Router();
var weather = require('../services/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  weather.search(res);
});

module.exports = router;
