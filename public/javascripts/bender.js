var bender;
(function (bender) {
  'use strict';

  function init() {
    register();
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

  function register() {
    $('.luminosity').on({click: luminosity});
  }

  function luminosity() {
    var val = $(this).data('value');

    var uri    = '/api/luminosity';
    var data = JSON.stringify({data: val});

    $.ajax({
          url: uri,
          type: 'PUT',
          data: data,
          contentType: "application/json",
          dataType: 'json'
    });
  }
})(bender || (bender = {}));

bender.init();
