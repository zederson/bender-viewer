var express   = require('express');
var router    = express.Router();
var weather   = require('../services/weather');
var publisher = require('../services/publisher_web');

/* GET home page. */
router.get('/', function(req, res, next) {
  weather.search(res);
});

router.put('/api/luminosity', function(req, res, next) {
  var val = req.body.data;
  publisher.luminosity(val);
});

router.put('/api/luminosity/off_all', function(req, res, next) {
  publisher.bulbOffAll();
});

router.put('/api/bulb', function(req, res, next) {
  var target = req.body.lamp;
  var color  = req.body.color;
  publisher.bulb(target, color);
});

module.exports = router;
