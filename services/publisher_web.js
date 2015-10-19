var mqtt      = require('mqtt');
var publisher = require('./publisher_web');
var host      = 'mqtt://cpro25389.publiccloud.com.br';
var subscribe = ['sensors/temperature', 'sensors/luminosity', 'sensors/socket/1'];
var client    = mqtt.connect(host);

module.exports.start = function(io) {
  client.on('connect', function () {
    subscribe.forEach(function(item){
      client.subscribe(item);
    });
  });

  io.on('connection', function (socket) {
    client.on('message', function (topic, message) {
      socket.emit(topic, { value: message });
    });
  });
}

module.exports.luminosity = function(val) {
  var result = '' + val;
  client.publish('lights/sensor/luminosity', result);
}

module.exports.bulb = function(lamp, color) {
  var topic = 'lights/' + lamp + '/color';
  client.publish(topic, color);
}

module.exports.bulbOffAll = function() {
  var topic = 'lights/off';
  client.publish(topic, '' );
}
