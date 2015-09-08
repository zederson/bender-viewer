var express = require('express');
var router  = express.Router();
var weather = require('../services/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  var result = weather.search();

  res.render('index', { weather: result });
});

module.exports = router;
