var bender;
(function (bender) {
  'use strict';

  function init() {
    //var socket = io.connect('http://localhost:3000/');
    var socket = io.connect('http://ederson.jelasticlw.com.br/');

    socket.on('sensors/temperature', function (data) {
      $('#temperature').text(data.value + 'ºC');
    });

    socket.on('sensors/luminosity', function (data) {
      var val = (parseInt(data.value) / 1023) * 100;
      val = val.toFixed(0);
      $('#luminosity').text(val + ' %');
    });
  }
  bender.init = init;
})(bender || (bender = {}));

bender.init();
