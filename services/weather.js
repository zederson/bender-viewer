var request = require('request');
var apiKey  = 'eb3dbf7c2dabe22fecf6de88edc7a';
var local   = 'Osasco';
var requestUrl = 'https://api.worldweatheronline.com/free/v2/weather.ashx?q=' + local + '&lang=pt&format=json&num_of_days=1&key=' + apiKey;

module.exports.search = function() {
  var result = {};
  request(requestUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json    = JSON.parse(body);
      var current = json.data.current_condition[0];

      result.temp        = current.temp_C;
      result.description = current.lang_pt[0].value;
      result.icon        = current.weatherIconUrl[0].value;
      return result;
    }
  });

  return result;
}
